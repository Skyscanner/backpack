package net.skyscanner.backpack

import android.os.Bundle

import com.facebook.react.ReactActivity
import com.facebook.react.modules.i18nmanager.I18nUtil

class MainActivity : ReactActivity() {
    override fun onCreate(savedInstance: Bundle?) {
        super.onCreate(savedInstance)

        val sharedI18nUtilInstance = I18nUtil.getInstance()
        sharedI18nUtilInstance.allowRTL(this, true)
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "native"
    }
}
