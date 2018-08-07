package net.skyscaner.backpack.badge

import android.view.Choreographer
import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import net.skyscaner.backpack.BpkBadge

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
        Choreographer.getInstance().postFrameCallback {
            badge.measure(View.MeasureSpec.makeMeasureSpec(badge.getMeasuredWidth(), View.MeasureSpec.EXACTLY),
                    View.MeasureSpec.makeMeasureSpec(badge.getMeasuredHeight(), View.MeasureSpec.EXACTLY));
            badge.layout(0, 0, badge.getMeasuredWidth(), badge.getMeasuredHeight())
            badge.getViewTreeObserver().dispatchOnGlobalLayout()
        }
    }


    @ReactProp(name = "type")
    fun setType(badge: BpkBadge, type: String) {
        badge.mType = BpkBadge.BpkBadgeType.fromType(type)
    }

    companion object {
        val REACT_CLASS = "BPKBadgeWrapper"
    }
}

