/**
 * AI Personal Assistant Mobile App with Voice Commands
 * React Native + Expo
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// AI Assistant Engine (simplified for demo)
class AIAssistant {
  constructor() {
    this.commands = {
      weather: ['weather', 'temperature', 'forecast', 'rain'],
      reminder: ['remind', 'reminder', 'alarm', 'schedule'],
      search: ['search', 'find', 'look up', 'google'],
      music: ['play', 'music', 'song', 'spotify'],
      call: ['call', 'phone', 'dial', 'contact'],
      message: ['text', 'message', 'sms', 'send'],
      navigation: ['navigate', 'directions', 'maps', 'route'],
      calendar: ['calendar', 'meeting', 'event', 'appointment'],
    };
  }

  processCommand(text) {
    const lowerText = text.toLowerCase();
    
    for (const [action, keywords] of Object.entries(this.commands)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return this.executeAction(action, lowerText);
      }
    }
    
    return {
      success: false,
      message: "I'm not sure how to help with that. Try asking about weather, reminders, or music!",
      action: 'unknown'
    };
  }

  executeAction(action, text) {
    const responses = {
      weather: "🌤️ It's currently 72°F and sunny. Perfect weather for a walk!",
      reminder: "⏰ I've set a reminder for you. I'll notify you at the right time.",
      search: "🔍 Searching the web for you...",
      music: "🎵 Playing your favorite playlist now!",
      call: "📞 Initiating call...",
      message: "💬 Opening messages. What would you like to say?",
      navigation: "🗺️ Getting directions for you...",
      calendar: "📅 Here's your schedule for today..."
    };

    return {
      success: true,
      message: responses[action],
      action
    };
  }
}

const assistant = new AIAssistant();

export default function App() {
  const [messages, setMessages] = useState([
    { id: '0', type: 'bot', text: "Hello! I'm your AI assistant. How can I help you today?" }
  ]);
  const [isListening, setIsListening] = useState(false);

  const quickCommands = [
    "What's the weather?",
    "Set a reminder",
    "Play some music",
    "Navigate home",
    "Show my calendar"
  ];

  const handleCommand = (command) => {
    // Add user message
    const userMsg = { id: Date.now().toString(), type: 'user', text: command };
    
    // Process with AI
    const response = assistant.processCommand(command);
    const botMsg = { 
      id: (Date.now() + 1).toString(), 
      type: 'bot', 
      text: response.message,
      action: response.action
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In production, this would trigger voice recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        handleCommand("What's the weather today?");
      }, 2000);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.type === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.type === 'user' ? styles.userText : styles.botText
      ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>🤖 AI Assistant</Text>
        <Text style={styles.subtitle}>Voice-powered personal assistant</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
      />

      <View style={styles.quickCommands}>
        <Text style={styles.quickTitle}>Quick Commands:</Text>
        <View style={styles.commandsRow}>
          {quickCommands.map((cmd, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickButton}
              onPress={() => handleCommand(cmd)}
            >
              <Text style={styles.quickButtonText}>{cmd}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.micButton, isListening && styles.micButtonActive]}
          onPress={toggleListening}
        >
          <Text style={styles.micIcon}>{isListening ? '🎙️' : '🎤'}</Text>
          <Text style={styles.micText}>
            {isListening ? 'Listening...' : 'Tap to speak'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 15,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6c5ce7',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2d2d44',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#fff',
  },
  quickCommands: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  quickTitle: {
    color: '#888',
    fontSize: 12,
    marginBottom: 10,
  },
  commandsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickButton: {
    backgroundColor: '#2d2d44',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  quickButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  micButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  micButtonActive: {
    backgroundColor: '#e84393',
  },
  micIcon: {
    fontSize: 36,
  },
  micText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 5,
  },
});

