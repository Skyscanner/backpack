package net.skyscanner.backpack.panel;

import android.content.Context;
import android.content.res.TypedArray;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.widget.FrameLayout;

import net.skyscanner.backpack.R;

public class BpkPanel extends FrameLayout {

    private boolean mPadding;

    public BpkPanel(@NonNull Context context) {
        super(context);
    }

    public BpkPanel(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initialize(context, attrs, defStyleAttr);
    }

    public BpkPanel(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initialize(context, attrs, 0);
    }

    public void setPadding(boolean mPadding) {
        this.mPadding = mPadding;
    }

    private void initialize(Context context, AttributeSet attrs, int defStyleAttr) {

        TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.panel, defStyleAttr,
                R.style.Bpk_panel);

        if (a.hasValue(R.styleable.panel_bpk_panel_padding)) {
            //default value of padding is true
            mPadding = a.getBoolean(R.styleable.panel_bpk_panel_padding, true);
        }
        int padding = getResources().getDimensionPixelOffset(R.dimen.bpkSpacingSm);
        if (mPadding)
            this.setPadding(padding, padding, padding, padding);

        this.setBackground(getResources().getDrawable(R.drawable.border));
    }
}
