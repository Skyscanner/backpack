package net.skyscaner.backpack.panel;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import net.skyscanner.backpack.panel.BpkPanel;


public class PanelManager extends SimpleViewManager<BpkPanel> {

    public static final String REACT_CLASS = "BPKPanel";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected BpkPanel createViewInstance(ThemedReactContext reactContext) {
        return new BpkPanel(reactContext);
    }
}
