const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 5051;

app.use(cors());
app.use(express.json());

// Smart Home Devices Database
const devices = {
  lights: [
    { id: 'light-1', name: 'Living Room Light', room: 'living room', status: 'off', brightness: 100 },
    { id: 'light-2', name: 'Bedroom Light', room: 'bedroom', status: 'off', brightness: 80 },
    { id: 'light-3', name: 'Kitchen Light', room: 'kitchen', status: 'off', brightness: 100 },
  ],
  thermostats: [
    { id: 'thermo-1', name: 'Main Thermostat', temperature: 72, mode: 'auto' },
  ],
  locks: [
    { id: 'lock-1', name: 'Front Door', status: 'locked' },
    { id: 'lock-2', name: 'Back Door', status: 'locked' },
  ],
  appliances: [
    { id: 'tv-1', name: 'Living Room TV', room: 'living room', status: 'off' },
    { id: 'coffee-1', name: 'Coffee Maker', room: 'kitchen', status: 'off' },
  ]
};

// Voice Command Parser
class VoiceCommandProcessor {
  constructor() {
    this.intents = {
      turn_on: ['turn on', 'switch on', 'enable', 'start', 'activate'],
      turn_off: ['turn off', 'switch off', 'disable', 'stop', 'deactivate'],
      set_temperature: ['set temperature', 'set thermostat', 'make it', 'change temperature'],
      lock: ['lock', 'secure'],
      unlock: ['unlock', 'open'],
      dim: ['dim', 'brightness', 'set brightness'],
      status: ['status', 'what is', 'how is', 'check'],
      list: ['list', 'show', 'what devices', 'all devices']
    };

    this.rooms = ['living room', 'bedroom', 'kitchen', 'bathroom', 'garage'];
    this.deviceTypes = ['light', 'lights', 'tv', 'television', 'thermostat', 'door', 'coffee maker'];
  }

  parseCommand(text) {
    const lowerText = text.toLowerCase();
    
    // Detect intent
    let detectedIntent = null;
    for (const [intent, patterns] of Object.entries(this.intents)) {
      if (patterns.some(p => lowerText.includes(p))) {
        detectedIntent = intent;
        break;
      }
    }

    // Detect room
    const detectedRoom = this.rooms.find(room => lowerText.includes(room));

    // Detect device type
    const detectedDevice = this.deviceTypes.find(device => lowerText.includes(device));

    // Extract numbers (for temperature, brightness)
    const numbers = lowerText.match(/\d+/);
    const value = numbers ? parseInt(numbers[0]) : null;

    return {
      intent: detectedIntent,
      room: detectedRoom,
      deviceType: detectedDevice,
      value,
      originalText: text
    };
  }

  executeCommand(parsed) {
    const { intent, room, deviceType, value } = parsed;

    switch (intent) {
      case 'turn_on':
        return this.controlDevice(room, deviceType, 'on');
      case 'turn_off':
        return this.controlDevice(room, deviceType, 'off');
      case 'set_temperature':
        return this.setTemperature(value);
      case 'lock':
        return this.controlLock('locked');
      case 'unlock':
        return this.controlLock('unlocked');
      case 'dim':
        return this.setBrightness(room, value);
      case 'status':
        return this.getStatus(room, deviceType);
      case 'list':
        return this.listDevices();
      default:
        return { success: false, message: "I didn't understand that command. Try 'turn on living room light'" };
    }
  }

  controlDevice(room, deviceType, status) {
    let controlled = [];
    
    // Control lights
    if (!deviceType || deviceType.includes('light')) {
      devices.lights.forEach(light => {
        if (!room || light.room === room) {
          light.status = status;
          controlled.push(light.name);
        }
      });
    }

    // Control TV
    if (deviceType === 'tv' || deviceType === 'television') {
      devices.appliances.filter(a => a.name.includes('TV')).forEach(tv => {
        if (!room || tv.room === room) {
          tv.status = status;
          controlled.push(tv.name);
        }
      });
    }

    // Control coffee maker
    if (deviceType === 'coffee maker') {
      devices.appliances.filter(a => a.name.includes('Coffee')).forEach(device => {
        device.status = status;
        controlled.push(device.name);
      });
    }

    if (controlled.length > 0) {
      return { 
        success: true, 
        message: `✅ Turned ${status}: ${controlled.join(', ')}`,
        devices: controlled
      };
    }
    return { success: false, message: "No matching devices found" };
  }

  setTemperature(temp) {
    if (!temp || temp < 60 || temp > 85) {
      return { success: false, message: "Please specify a temperature between 60-85°F" };
    }
    devices.thermostats[0].temperature = temp;
    return { success: true, message: `🌡️ Thermostat set to ${temp}°F` };
  }

  controlLock(status) {
    devices.locks.forEach(lock => lock.status = status);
    return { 
      success: true, 
      message: `🔒 All doors are now ${status}`,
      devices: devices.locks.map(l => l.name)
    };
  }

  setBrightness(room, brightness) {
    if (!brightness || brightness < 0 || brightness > 100) {
      return { success: false, message: "Please specify brightness between 0-100%" };
    }
    devices.lights.forEach(light => {
      if (!room || light.room === room) {
        light.brightness = brightness;
      }
    });
    return { success: true, message: `💡 Brightness set to ${brightness}%` };
  }

  getStatus(room, deviceType) {
    const status = [];
    
    devices.lights.forEach(light => {
      if (!room || light.room === room) {
        status.push(`${light.name}: ${light.status}, ${light.brightness}% brightness`);
      }
    });

    if (!deviceType) {
      status.push(`Thermostat: ${devices.thermostats[0].temperature}°F`);
      devices.locks.forEach(lock => status.push(`${lock.name}: ${lock.status}`));
    }

    return { success: true, message: status.join('\n'), devices: status };
  }

  listDevices() {
    const all = [
      ...devices.lights.map(d => `💡 ${d.name} (${d.room})`),
      ...devices.thermostats.map(d => `🌡️ ${d.name}`),
      ...devices.locks.map(d => `🔒 ${d.name}`),
      ...devices.appliances.map(d => `📺 ${d.name}`)
    ];
    return { success: true, message: all.join('\n'), devices: all };
  }
}

const processor = new VoiceCommandProcessor();

// Socket.IO for real-time voice commands
io.on('connection', (socket) => {
  console.log('🏠 Smart Home client connected');

  socket.on('voice_command', (data) => {
    console.log(`🎤 Voice command: ${data.text}`);
    const parsed = processor.parseCommand(data.text);
    const result = processor.executeCommand(parsed);
    socket.emit('command_result', { ...result, parsed });
    io.emit('devices_updated', devices);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// REST API
app.get('/api/devices', (req, res) => {
  res.json({ success: true, devices });
});

app.post('/api/command', (req, res) => {
  const { command } = req.body;
  const parsed = processor.parseCommand(command);
  const result = processor.executeCommand(parsed);
  res.json({ ...result, parsed });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Voice Assistant Smart Home running!' });
});

server.listen(PORT, () => {
  console.log(`🏠 Smart Home Voice Assistant running on port ${PORT}`);
  console.log(`🎤 Voice command processor initialized`);
});

