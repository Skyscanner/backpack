package net.skyscanner.backpack

import android.content.Context
import android.util.AttributeSet
import android.widget.LinearLayout


class BpkPanel : LinearLayout {

    private var mPadding: Boolean = false

    constructor(context: Context) : super(context) {
        this.orientation = LinearLayout.VERTICAL
    }

    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, R.style.Bpk_panel) {
        initialize(context, attrs, defStyleAttr)
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        initialize(context, attrs, R.style.Bpk_panel)
    }

    fun setmPadding(mPadding: Boolean) {
        this.mPadding = mPadding
        draw()
    }

    private fun draw() {
        this.background = context.getDrawable(R.drawable.border)
        val padding = resources.getDimensionPixelOffset(R.dimen.bpkSpacingSm)
        if (mPadding)
            this.setPadding(padding, padding, padding, padding)
        val params = LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT)
        params.setMargins(padding, padding, padding, padding)
        this.layoutParams = params
    }


    private fun initialize(context: Context, attrs: AttributeSet?, defStyleAttr: Int) {

        val a = context.obtainStyledAttributes(attrs, R.styleable.panel, R.attr.bpk_padding, 0)
        if (a.hasValue(R.styleable.panel_bpk_padding)) {
            //default value of padding is true
            mPadding = a.getBoolean(R.styleable.panel_bpk_padding, true)
        }
        draw()
    }

}
