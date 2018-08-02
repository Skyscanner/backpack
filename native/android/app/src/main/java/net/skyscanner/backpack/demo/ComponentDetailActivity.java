package net.skyscanner.backpack.demo;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.widget.Toolbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.ActionBar;
import android.view.MenuItem;
import android.widget.ImageView;

import com.squareup.picasso.*;

import net.skyscanner.backpack.R;
import net.skyscanner.backpack.demo.data.ComponentRegistry;

/**
 * An activity representing a single Component detail screen. This
 * activity is only used on narrow width devices. On tablet-size devices,
 * item details are presented side-by-side with a list of items
 * in a {@link ComponentListActivity}.
 */
public class ComponentDetailActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_component_detail);
        Toolbar toolbar = (Toolbar) findViewById(R.id.detail_toolbar);
        setSupportActionBar(toolbar);
        ImageView image = findViewById(R.id.img);
        Picasso.get().load(R.drawable.header).resize(1024, 800)
                .onlyScaleDown().into(image);

        // Show the Up button in the action bar.
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
        }

        // savedInstanceState is non-null when there is fragment state
        // saved from previous configurations of this activity
        // (e.g. when rotating the screen from portrait to landscape).
        // In this case, the fragment will automatically be re-added
        // to its container so we don't need to manually add it.
        // For more information, see the Fragments API guide at:
        //
        // http://developer.android.com/guide/components/fragments.html
        //
        if (savedInstanceState == null) {
            // Create the detail fragment and add it to the activity
            // using a fragment transaction.
            Bundle arguments = new Bundle();
            arguments.putString(ComponentDetailFragment.ARG_ITEM_ID,
                    getIntent().getStringExtra(ComponentDetailFragment.ARG_ITEM_ID));
            ComponentRegistry.Component component = ComponentRegistry.ITEM_MAP.get(getIntent().getStringExtra(ComponentDetailFragment.ARG_ITEM_ID));
            toolbar.setTitle(getIntent().getStringExtra(ComponentDetailFragment.ARG_ITEM_ID));
            ComponentDetailFragment fragment = null;
            try {
                fragment = component.fragmentClass.newInstance();
            } catch (InstantiationException e) {
                e.printStackTrace();

            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }

            fragment.setArguments(arguments);
            getSupportFragmentManager().beginTransaction()
                    .add(R.id.component_detail_container, fragment)
                    .commit();
        }
    }
}
