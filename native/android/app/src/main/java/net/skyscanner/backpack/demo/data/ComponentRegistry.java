package net.skyscanner.backpack.demo.data;

import net.skyscanner.backpack.demo.ComponentDetailFragment;
import net.skyscanner.backpack.demo.stories.BadgeFragment;
import net.skyscanner.backpack.demo.stories.PanelFragment;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Helper class for providing sample content for user interfaces created by
 * Android template wizards.
 * <p>
 * TODO: Replace all uses of this class before publishing your app.
 */
public class ComponentRegistry {

    /**
     * An array of sample (dummy) items.
     */
    public static final List<Component> ITEMS = new ArrayList<Component>();

    /**
     * A map of sample (dummy) items, by ID.
     */
    public static final Map<String, Component> ITEM_MAP = new HashMap<String, Component>();

    static {
        addItem(new Component("Panel", PanelFragment.class));
        addItem(new Component("Badge", BadgeFragment.class));
    }

    private static void addItem(Component item) {
        ITEMS.add(item);
        ITEM_MAP.put(item.id, item);
    }

    /**
     * A dummy item representing a piece of content.
     */
    public static class Component {
        public final String id;
        public final Class<? extends ComponentDetailFragment> fragmentClass;

        public Component(String id, Class<? extends ComponentDetailFragment> fragmentClass) {
            this.id = id;
            this.fragmentClass = fragmentClass;
        }
    }
}
