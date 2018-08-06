package net.skyscanner.backpack

import android.content.Context
import android.util.AttributeSet
import android.widget.LinearLayout


class BpkPanel(
        context: Context,
        attrs: AttributeSet?,
        defStyleAttr: Int) : LinearLayout(context, attrs, defStyleAttr) {

    constructor(context: Context) : this(context, null)
    constructor(context: Context, attrs: AttributeSet?) : this(context, attrs, R.style.Bpk_panel)

    init {
        this.orientation = LinearLayout.VERTICAL
        initialize(context, attrs, defStyleAttr)
    }

    var mPadding: Boolean = false
        set(value) {
            field = value
            draw()
        }

    private fun draw() {
        this.background = context.getDrawable(R.drawable.border)
        val padding = resources.getDimensionPixelOffset(R.dimen.bpkSpacingSm)
        if (mPadding) {
            this.setPadding(padding, padding, padding, padding)
        }
        val params = LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT)
        params.setMargins(padding, padding, padding, padding)
        this.layoutParams = params
    }


    private fun initialize(context: Context, attrs: AttributeSet?, defStyleAttr: Int) {

        val a = context.obtainStyledAttributes(attrs, R.styleable.panel, R.attr.bpk_padding, defStyleAttr)
        if (a.hasValue(R.styleable.panel_bpk_padding)) {
            //default value of padding is true
            mPadding = a.getBoolean(R.styleable.panel_bpk_padding, true)
        }
        draw()
    }

}
