package net.skyscaner.backpack.panel;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import net.skyscanner.backpack.panel.BpkPanelWithDivider;

public class PanelWithDivider extends SimpleViewManager<BpkPanelWithDivider> {

    public static final String REACT_CLASS = "BPKPanel";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected BpkPanelWithDivider createViewInstance(ThemedReactContext reactContext) {
        return new BpkPanelWithDivider(reactContext);
    }
}

