package net.skyscanner.backpack;

import android.graphics.PixelFormat;

import junit.framework.Assert;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.RuntimeEnvironment;
import org.robolectric.annotation.Config;

@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE)
public class BpkBadgeTest {

    @Test
    public void test_message() {
        BpkBadge badge = new BpkBadge(RuntimeEnvironment.application.getApplicationContext());
        badge.setMessage("error");
        badge.setType(BpkBadge.Type.Destructive);
        Assert.assertEquals("error", badge.getText().toString());
    }

    @Test
    public void test_alpha_default() {
        BpkBadge badge = new BpkBadge(RuntimeEnvironment.application.getApplicationContext());
        badge.setType(BpkBadge.Type.Success);
        Assert.assertEquals(badge.getBackground().getOpacity(), PixelFormat.OPAQUE);
    }

    @Test
    public void test_alpha_outline() {
        BpkBadge badge = new BpkBadge(RuntimeEnvironment.application.getApplicationContext());
        badge.setType(BpkBadge.Type.Outline);
        Assert.assertEquals(badge.getBackground().getOpacity(), PixelFormat.TRANSLUCENT);
    }
}
