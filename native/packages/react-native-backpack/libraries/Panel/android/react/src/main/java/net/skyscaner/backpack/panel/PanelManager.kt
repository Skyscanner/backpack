package net.skyscanner.backpack

import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp


class PanelManager : ViewGroupManager<BpkPanel>() {

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): BpkPanel {
        return BpkPanel(reactContext)
    }

    @ReactProp(name = "bpkpadding", defaultBoolean = true)
    fun setPadding(panel: BpkPanel, padding: Boolean) {
        panel.setmPadding(padding)
    }

    companion object {
        val REACT_CLASS = "BpkPanel"
    }

}
