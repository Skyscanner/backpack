package net.skyscaner.backpack.panel

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

import net.skyscanner.backpack.panel.BpkPanel


class PanelManager : SimpleViewManager<BpkPanel>() {

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): BpkPanel {
        return BpkPanel(reactContext)
    }

    companion object {

        val REACT_CLASS = "BPKPanel"
    }
}
