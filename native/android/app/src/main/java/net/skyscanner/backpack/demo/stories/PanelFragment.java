package net.skyscanner.backpack.demo.stories;

import android.os.Bundle;
import android.widget.Toast;

import net.skyscanner.backpack.demo.ComponentDetailFragment;

public class PanelFragment extends ComponentDetailFragment {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        Toast.makeText(getActivity(),"works!" , Toast.LENGTH_LONG).show();
        super.onCreate(savedInstanceState);
    }
}
