package com.dev;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.facebook.react.ReactActivityDelegate; // <- add this necessary import
import com.zoontek.rnbootsplash.RNBootSplash; // <- add this necessary import

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "dev";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    RNBootSplash.init(MainActivity.this);
  }
<<<<<<< HEAD
  
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        RNBootSplash.init(MainActivity.this); // <- initialize the splash screen
        super.loadApp(appKey);
      }
    };
  }
=======

// https://www.youtube.com/watch?v=PlubOKfi46o
//  @Override
//  protected void loadApp(String appKey) {
//    RNBootSplash.init(MainActivity.this); // <- initialize the splash screen
//    super.loadApp(appKey);
//  }
>>>>>>> bb2ae3e14f02590d444b439aefbf0889367236b1
}
