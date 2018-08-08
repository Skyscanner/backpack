package net.skyscanner.backpack

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp


class BadgeManager : SimpleViewManager<BpkBadge>() {
    override fun createViewInstance(reactContext: ThemedReactContext): BpkBadge {
        return BpkBadge(reactContext)
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    @ReactProp(name = "message")
    fun setMessage(badge: BpkBadge, message: String) {
        badge.message = message
    }


    @ReactProp(name = "type")
    fun setType(badge: BpkBadge, type: String) {
        badge.type = BpkBadge.BpkBadgeType.fromType(type)
    }

    companion object {
        val REACT_CLASS = "BPKBadgeWrapper"
    }

}

