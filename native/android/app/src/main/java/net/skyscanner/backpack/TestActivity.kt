package net.skyscanner.backpack

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.support.v7.widget.AppCompatButton
import android.view.View

class TestActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.test_activity)



        findViewById<AppCompatButton>(R.id.storybook_btn).setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View?) {
                val intent = Intent(this@TestActivity.baseContext, MainActivity::class.java)
                startActivity(intent)
            }
        })

    }

}
