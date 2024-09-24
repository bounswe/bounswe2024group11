# Zenith Mobile App

## How to setup your environment

### Prerequisities
- Node
- Watchman
- Android SDK
- [Optional] Device Emulator

#### Install Node
```bash
brew install nvm
nvm install 20
nvm use 20
```

#### Install Watchman
```bash
brew install watchman
```

#### Install Android Studio
```bash
brew install android-studio
```

Setup your environment
```bash
echo "export ANDROID_HOME=~/Library/Android/sdk" >> ~/.zprofile
echo "export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools" >> ~/.zshrc

zsh -l
```
### Clone the Repository
```bash
git clone https://github.com/bounswe/bounswe2024group11.git

cd bounswe2024group11/mobile
```

### Install Dependencies
```bash
npm install
```


### Run the app
Start a device emulator/simulator

```bash
npx expo start
```

Select the device you want to run the app in by the shortcuts you see in the terminal.

![alt text](image.png)
