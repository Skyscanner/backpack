package net.skyscaner.backpack.panel

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

import net.skyscanner.backpack.panel.BpkPanelWithDivider

class PanelWithDivider : SimpleViewManager<BpkPanelWithDivider>() {

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): BpkPanelWithDivider {
        return BpkPanelWithDivider(reactContext)
    }

    companion object {

        val REACT_CLASS = "BPKPanel"
    }
}

