# 🏠 Custom Voice Assistant for Smart Home Control

A voice-controlled smart home system with natural language processing for device control.

## 🎯 Features

- **Voice Commands**: Natural language device control
- **Multi-Room Support**: Control devices by room
- **Device Types**: Lights, thermostats, locks, appliances
- **Real-time Updates**: WebSocket-based state sync
- **Intent Recognition**: AI command parsing
- **Status Queries**: Voice-based device status checks

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, Socket.IO
- **Voice**: Web Speech API / Google Speech
- **NLP**: Custom intent recognition
- **IoT**: MQTT support (optional)

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔗 API & Commands

### Voice Commands
```
"Turn on living room lights"
"Set temperature to 72 degrees"
"Lock all doors"
"Dim bedroom lights to 50 percent"
"What's the status of the thermostat?"
"List all devices"
```

### REST API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/devices` | Get all devices |
| POST | `/api/command` | Execute voice command |

## 🧠 NLP Intent Recognition

| Intent | Example Phrases |
|--------|-----------------|
| turn_on | "turn on", "switch on", "activate" |
| turn_off | "turn off", "switch off", "disable" |
| set_temperature | "set temperature", "make it" |
| lock/unlock | "lock", "unlock", "secure" |
| dim | "dim", "set brightness" |
| status | "what is", "check", "status" |

## 📁 Supported Devices

- 💡 Lights (on/off, brightness)
- 🌡️ Thermostats (temperature, mode)
- 🔒 Smart Locks (lock/unlock)
- 📺 TVs and Appliances

## 📝 License

MIT License - Team Akrix

