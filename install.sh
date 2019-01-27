#!/bin/bash
# This shell script performs system maintenance tasks in OS X
# It has been verified on OS X 10.5

##### Declaring some functions

installCordova()
{
    echo "Instal Apps via Cordova"
    echo "Clean Build Apps"
    rm -rf platforms/android/build/outputs/apk/*;
    rm -rf jobversand-v1.apk;
    echo "Build Ionic via Cordova"
    ionic cordova build android --release --prod;
    cp /Users/macbook/IonicProject/_asaba_fix_/platforms/android/build/outputs/apk/android-release-unsigned.apk /Users/macbook/IonicProject/_asaba_fix_/android-release-unsigned.apk;
    echo "Sign APK Files"
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks android-release-unsigned.apk my-alias;
    echo "Compress APK Files with zipalign"
    zipalign -v 4 android-release-unsigned.apk jobversand-v1.apk;
    rm -rf android-release-unsigned.apk;
    rm -rf android-release-SIGNED_UNALIGNED.apk;
    echo "Installing apk to Android Devices"
  if [[ $(adb devices -l | grep "device usb:") ]]; then
    echo "Do you need install to your devices ? (Y/n)"
    read CHOICES
    if [[ CHOICES == 'y' || 'Y' ]]; then
      echo "Before this Process finish don't put your devices !!"
      echo "Install App On android via ADB"
      adb install jobversand-v1.apk;
      echo "Success."
    fi
  else
    menu
  fi
}
installIonic()
{
    echo "Build Apps via Ionic CLI"
    echo "Clean Build Apps"
    rm -rf platforms/android/build/outputs/apk/*
    echo "Build Ionic via Ionic CLI"
    ionic build android
  if [[ $(adb devices -l | grep "device usb:") ]]; then
    echo "Do you need install to your devices ? (Y/n)"
    read CHOICES
    if [[ CHOICES == 'y' || 'Y' ]]; then
      echo "Before this Process finish don't put your devices !!"
      echo "Install App On android via ADB"
      adb install platforms/android/build/outputs/apk/android-debug.apk;
      echo "Success."
    fi
  else
    menu
  fi
}
runAndroid()
{
  if [[ $(adb devices -l | grep "device usb:") ]]; then
    echo "Devices found !!"
    echo "Before this Process finish don't put your devices !!"
    echo "Run App On android via ADB"
    ionic run android -lc;
  else
    echo "Devices not found !!"
    echo "Please check your devices and type 'adb devices on terminal' without quote !"
  fi
}
runBrowser()
{
  echo "Running ionic on Browser"
  ionic cordova run browser
}

menu()
{
  clear
  echo "Ionic Android Tool Builder by RCDev"
  echo "

  1 Build Android (Dev Mode + Install ADB)
  2 Build Android (Prod Mode + Install ADB)
  3 Run Browser
  4 Run Android with Log & Console
  5 Uninstall Program Android
  q Quit
  "
  echo -n "Please enter your choice: "
  read CHOICE
}

install1()
{
  echo "Before this Process finish don't put your devices !!"
  echo "Install App On android via ADB"

}

uninstall(){
  echo "Please input name project app :"
  read packageName
  doUninstall
}

doUninstall(){
  echo "Before this Process finish don't put your devices !!"
  echo "Uninstall App On android via ADB" 
  adb uninstall $packageName
}
################################################################################

while true
do
  menu
  case $CHOICE in

    1)
    installIonic
    echo ""
    echo -n "Press ENTER to continue"
    read
    ;;

    2)
    installCordova
    echo ""
    echo -n "Press ENTER to continue"
    read
    ;;

    3)
    runBrowser
    echo "Under Construction !!"
    echo -n "Press ENTER to continue"
    read
    ;;

    4)
    runAndroid
    echo ""
    echo -n "Press ENTER to continue"
    read
    ;;

    5)
    uninstall
    echo ""
    echo -n "Press ENTER to continue"
    read
    ;;

    y)
    installs
    read
    ;;

    Y)
    installs
    read
    ;;

    q|Q)
    clear
    exit 0
    ;;

    *)
    echo menu
    ;;

  esac
done
