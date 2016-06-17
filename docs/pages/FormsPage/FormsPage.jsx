import React from 'react'
import Helmet from 'react-helmet'

import styles from './forms-page.scss'

const FormsPage = () => (
  <div>
    <Helmet title='Forms' />
    <section>
      <h2>For light backgrounds</h2>
      <h3>Label</h3>
      <form className={styles.form}>
        <label className={styles.inputLabel}>I'm a label</label>
      </form>
      <h3>Text input</h3>
      <form className={styles.form}>
        <input type='text' placeholder='Enter some text' className={styles.inputText} />
      </form>
      <h3>Radio buttons</h3>
      <form className={styles.form}>
        <input type='radio' name='radio' className={styles.inputRadio} />
        <input type='radio' name='radio' className={styles.inputRadio} defaultChecked />
        <input type='radio' name='radio' className={styles.inputRadio} />
        <input type='radio' name='radio' className={styles.inputRadio} />
      </form>
      <h3>Checkboxes</h3>
      <form className={styles.form}>
        <input type='checkbox' className={styles.inputCheckbox} />
        <input type='checkbox' className={styles.inputCheckbox} />
        <input type='checkbox' className={styles.inputCheckbox} defaultChecked />
        <input type='checkbox' className={styles.inputCheckbox} />
      </form>
      <h3>Select menu</h3>
      <form className={styles.form}>
        <select className={styles.inputSelect}>
          <option value={1} defaultSelected>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </form>
      <h3>Textarea</h3>
      <form className={styles.form}>
        <textarea cols='30' rows='10' defaultValue='Edit this text' className={styles.inputTextarea}></textarea>
      </form>
    </section>
    <section>
      <h2>For dark backgrounds</h2>
      <h3>Label</h3>
      <form className={styles.darkForm}>
        <label className={styles.darkInputLabel}>I'm a label</label>
      </form>
      <h3>Text input</h3>
      <form className={styles.darkForm}>
        <input type='text' placeholder='Enter some text' className={styles.inputText} />
      </form>
      <h3>Radio buttons</h3>
      <form className={styles.darkForm}>
        <input type='radio' name='radio' className={styles.darkInputRadio} />
        <input type='radio' name='radio' className={styles.darkInputRadio} defaultChecked />
        <input type='radio' name='radio' className={styles.darkInputRadio} />
        <input type='radio' name='radio' className={styles.darkInputRadio} />
      </form>
      <h3>Checkboxes</h3>
      <form className={styles.darkForm}>
        <input type='checkbox' className={styles.darkInputCheckbox} />
        <input type='checkbox' className={styles.darkInputCheckbox} />
        <input type='checkbox' className={styles.darkInputCheckbox} defaultChecked />
        <input type='checkbox' className={styles.darkInputCheckbox} />
      </form>
      <h3>Select menu</h3>
      <form className={styles.darkForm}>
        <select className={styles.darkInputSelect}>
          <option value={1} defaultSelected>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </form>
      <h3>Textarea</h3>
      <form className={styles.darkForm}>
        <textarea cols='30' rows='10' defaultValue='Edit this text' className={styles.darkInputTextarea}></textarea>
      </form>
    </section>
    <section>
      <h2>Usage</h2>
      <pre>
        <code>{'@import "../node_modules/living-styles/forms";'}</code>
      </pre>
      <p>We currently have support for form elements on dark and light backgrounds</p>
      <p>
        For example: <em>@include ls-label-dark;</em> will generate the relevant CSS properties for labels on dark
        backgrounds, whereas <em>@include ls-label();</em> will generate CSS properties for labels on light backgrounds.
      </p>
      <pre>
        <code>
          {`@include ls-label();
@include ls-input-text();
@include ls-input-radio();
@include ls-input-checkbox();
@include ls-select();
@include ls-textarea();
@include ls-label-dark();
@include ls-input-text-dark();
@include ls-input-radio-dark();
@include ls-input-checkbox-dark();
@include ls-select-dark();
@include ls-textarea-dark();`}
        </code>
      </pre>
    </section>
  </div>
)

export default FormsPage
