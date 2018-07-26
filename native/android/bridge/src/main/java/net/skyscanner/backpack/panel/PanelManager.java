package net.skyscanner.backpack.panel;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;


public class PanelManager extends SimpleViewManager<BPKPanel> {

    public static final String REACT_CLASS = "BPKPanel";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected BPKPanel createViewInstance(ThemedReactContext reactContext) {
        return new BPKPanel(reactContext);
    }
}
