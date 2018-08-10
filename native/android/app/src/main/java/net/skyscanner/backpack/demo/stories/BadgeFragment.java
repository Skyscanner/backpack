package net.skyscanner.backpack.demo.stories;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import net.skyscanner.backpack.R;
import net.skyscanner.backpack.demo.ComponentDetailFragment;

public class BadgeFragment extends ComponentDetailFragment {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_badge, container, false);
    }

}

