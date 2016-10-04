import React, { PropTypes, Component } from 'react'
import Helmet from 'react-helmet'
import { PropTypes as RouterPropTypes } from 'react-router'

import BpkModal from 'bpk-component-modal'
import BpkButton from 'bpk-component-button'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import TOKENS from 'bpk-tokens/tokens/base.common'
import { withLargeButtonAlignment, withRtlSupport } from 'bpk-component-icon'
import LongArrowRightAltIcon from 'bpk-component-icon/lg/long-arrow-right-alt'
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid'

import './home-page.scss'
import * as ROUTES from './../../constants/routes'

const AlignedLongArrowRightAltIcon = withRtlSupport(withLargeButtonAlignment(LongArrowRightAltIcon))

const Content = () => (
  <div>
    <BpkParagraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacus nunc, tempor eget dapibus eget, ultrices
      sit amet nunc. Maecenas aliquet quam nec dui hendrerit, dictum fermentum turpis finibus. Proin ante purus,
      blandit id quam vitae, dignissim venenatis felis. Donec congue sem ac felis semper, at efficitur enim
      pulvinar. Nunc molestie in orci sit amet vestibulum. Ut mattis ante ac lacus ornare, nec sagittis ex finibus.
      Fusce condimentum dolor ac dignissim rutrum. Vivamus laoreet in lectus eu congue. Aliquam mollis, mauris in
      tincidunt gravida, orci urna porta sapien, ac facilisis leo eros et elit. Vivamus fermentum neque metus, et
      convallis lectus ultricies in. Phasellus eget erat in nibh pretium convallis. Fusce sed semper ante. Phasellus
      eget elementum lacus.
    </BpkParagraph>
    <BpkParagraph>
      Nunc pretium erat nec ante faucibus molestie. Vestibulum ultrices purus quis lorem consectetur sollicitudin.
      Mauris dapibus ac libero et bibendum. In malesuada eget nisl ac bibendum. Etiam ac nulla egestas, luctus eros
      quis, ornare libero. Fusce a lacinia dolor. Nullam auctor finibus dui, sit amet luctus nibh blandit in.
      Maecenas justo tortor, faucibus ut ante ac, eleifend ornare nisl. Quisque tempus, metus sit amet fringilla
      tristique, urna mi tincidunt nulla, et tristique eros mauris sed ex. Sed lorem odio, elementum congue tellus
      vitae, suscipit hendrerit ipsum.
    </BpkParagraph>
    <BpkParagraph>
      Curabitur a posuere dolor. Maecenas accumsan magna nec risus facilisis tristique. Aliquam mollis lectus ac mi
      scelerisque condimentum. Sed id est ut felis euismod maximus. Fusce sit amet erat imperdiet, lacinia libero
      vitae, eleifend erat. Integer cursus, est vitae hendrerit eleifend, justo ipsum mattis neque, vitae
      consectetur arcu massa vitae orci. Sed rhoncus nisi id est tristique, finibus convallis ligula rutrum.
      Pellentesque volutpat, neque eget consequat commodo, diam orci aliquam ex, eget ornare nulla ipsum ac eros.
      Nunc quis tempus diam. Mauris congue fringilla ligula id lacinia. Donec vulputate eleifend pellentesque. Cras
      ut imperdiet metus, ut imperdiet nulla. Fusce a metus lacinia, ullamcorper ante eu, semper urna. Vestibulum eu
      velit eu ipsum dictum volutpat nec rutrum augue.
    </BpkParagraph>
    <BpkParagraph>
      Vestibulum eu posuere erat. Ut id turpis nibh. Aenean congue mi eu scelerisque bibendum. Curabitur vel metus
      elementum, laoreet erat in, pellentesque magna. Morbi consectetur lectus eu quam bibendum viverra. Donec sed
      est ut nunc facilisis dictum. Praesent lacinia neque ante, in pellentesque ante tempus sit amet. Fusce
      vehicula tincidunt auctor. Quisque ornare, diam et ultricies blandit, augue ipsum congue eros, a volutpat
      tellus massa in sem. Etiam interdum nibh nec orci molestie pretium.
    </BpkParagraph>
    <BpkParagraph>
      Quisque eleifend ullamcorper metus, eget auctor eros varius ut. Proin faucibus non mauris quis pharetra.
      Curabitur porttitor enim et sollicitudin feugiat. Morbi suscipit molestie risus, eu sodales lacus accumsan eu.
      Proin eget consequat turpis. Cras auctor magna id quam mattis, ac sollicitudin erat viverra. Aliquam sit amet
      blandit quam, vel facilisis ipsum. Maecenas at risus semper, venenatis orci vitae, aliquam velit.
    </BpkParagraph>
    <BpkParagraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacus nunc, tempor eget dapibus eget, ultrices
      sit amet nunc. Maecenas aliquet quam nec dui hendrerit, dictum fermentum turpis finibus. Proin ante purus,
      blandit id quam vitae, dignissim venenatis felis. Donec congue sem ac felis semper, at efficitur enim
      pulvinar. Nunc molestie in orci sit amet vestibulum. Ut mattis ante ac lacus ornare, nec sagittis ex finibus.
      Fusce condimentum dolor ac dignissim rutrum. Vivamus laoreet in lectus eu congue. Aliquam mollis, mauris in
      tincidunt gravida, orci urna porta sapien, ac facilisis leo eros et elit. Vivamus fermentum neque metus, et
      convallis lectus ultricies in. Phasellus eget erat in nibh pretium convallis. Fusce sed semper ante. Phasellus
      eget elementum lacus.
    </BpkParagraph>
    <BpkParagraph>
      Nunc pretium erat nec ante faucibus molestie. Vestibulum ultrices purus quis lorem consectetur sollicitudin.
      Mauris dapibus ac libero et bibendum. In malesuada eget nisl ac bibendum. Etiam ac nulla egestas, luctus eros
      quis, ornare libero. Fusce a lacinia dolor. Nullam auctor finibus dui, sit amet luctus nibh blandit in.
      Maecenas justo tortor, faucibus ut ante ac, eleifend ornare nisl. Quisque tempus, metus sit amet fringilla
      tristique, urna mi tincidunt nulla, et tristique eros mauris sed ex. Sed lorem odio, elementum congue tellus
      vitae, suscipit hendrerit ipsum.
    </BpkParagraph>
    <BpkParagraph>
      Curabitur a posuere dolor. Maecenas accumsan magna nec risus facilisis tristique. Aliquam mollis lectus ac mi
      scelerisque condimentum. Sed id est ut felis euismod maximus. Fusce sit amet erat imperdiet, lacinia libero
      vitae, eleifend erat. Integer cursus, est vitae hendrerit eleifend, justo ipsum mattis neque, vitae
      consectetur arcu massa vitae orci. Sed rhoncus nisi id est tristique, finibus convallis ligula rutrum.
      Pellentesque volutpat, neque eget consequat commodo, diam orci aliquam ex, eget ornare nulla ipsum ac eros.
      Nunc quis tempus diam. Mauris congue fringilla ligula id lacinia. Donec vulputate eleifend pellentesque. Cras
      ut imperdiet metus, ut imperdiet nulla. Fusce a metus lacinia, ullamcorper ante eu, semper urna. Vestibulum eu
      velit eu ipsum dictum volutpat nec rutrum augue.
    </BpkParagraph>
    <BpkParagraph>
      Vestibulum eu posuere erat. Ut id turpis nibh. Aenean congue mi eu scelerisque bibendum. Curabitur vel metus
      elementum, laoreet erat in, pellentesque magna. Morbi consectetur lectus eu quam bibendum viverra. Donec sed
      est ut nunc facilisis dictum. Praesent lacinia neque ante, in pellentesque ante tempus sit amet. Fusce
      vehicula tincidunt auctor. Quisque ornare, diam et ultricies blandit, augue ipsum congue eros, a volutpat
      tellus massa in sem. Etiam interdum nibh nec orci molestie pretium.
    </BpkParagraph>
    <BpkParagraph>
      Quisque eleifend ullamcorper metus, eget auctor eros varius ut. Proin faucibus non mauris quis pharetra.
      Curabitur porttitor enim et sollicitudin feugiat. Morbi suscipit molestie risus, eu sodales lacus accumsan eu.
      Proin eget consequat turpis. Cras auctor magna id quam mattis, ac sollicitudin erat viverra. Aliquam sit amet
      blandit quam, vel facilisis ipsum. Maecenas at risus semper, venenatis orci vitae, aliquam velit.
    </BpkParagraph>
  </div>
)

class ModalExample extends Component {
  constructor () {
    super()

    this.onModalOpen = this.onModalOpen.bind(this)
    this.onModalClose = this.onModalClose.bind(this)

    this.state = {
      isOpen: false
    }
  }

  onModalOpen () {
    this.setState({
      isOpen: true
    })
  }

  onModalClose () {
    this.setState({
      isOpen: false
    })
  }

  render () {
    return (
      <div>
        <BpkButton onClick={this.onModalOpen}>Open modal</BpkButton>
        <BpkModal
          title='Modal title'
          isOpen={this.state.isOpen}
          onClose={this.onModalClose}
          getApplicationElement={() => document.getElementById('react-mount')}
        >
          <Content />
        </BpkModal>
      </div>
    )
  }
}

class HomePage extends React.Component {
  constructor (props) {
    super(props)

    this.onGettingStartedClick = this.onGettingStartedClick.bind(this)
  }

  onGettingStartedClick (e) {
    e.preventDefault()
    this.props.router.push(e.currentTarget.getAttribute('href'))
  }

  render () {
    return (
      <section>
        <Helmet title='Backpack' />
        <div className='bpkdocs-home-page__hero'>
          <BpkGridContainer>
            <BpkGridRow>
              <BpkGridColumn width={12}>
                <BpkHeading level='h1'>Backpack</BpkHeading>
                <BpkHeading level='h2'>
                  Backpack is a collection of design resources, reusable components and guidelines for creating
                  Skyscanner products.
                </BpkHeading>
                <BpkButton large href={ROUTES.GETTING_STARTED} onClick={this.onGettingStartedClick}>
                  Get started <AlignedLongArrowRightAltIcon fill={TOKENS.colorWhite} />
                </BpkButton>
                <ModalExample />
              </BpkGridColumn>
            </BpkGridRow>
          </BpkGridContainer>
        </div>
        <BpkGridContainer>
          <BpkGridRow>
            <BpkGridColumn width={6} tabletWidth={12}>
              <BpkHeading level='h3'>Mission</BpkHeading>
              <BpkParagraph>To bring Design and Engineering teams together to help drive product consistency
                at scale and reduce waste by offering a platform by which to share components easily.
              </BpkParagraph>
            </BpkGridColumn>
            <BpkGridColumn width={6} tabletWidth={12}>
              <BpkHeading level='h3'>About Backpack</BpkHeading>
              <BpkParagraph>
                Backpack is the foundation for all Skyscanner products and is maintained by the Backpack Design System
                Squad. It builds on Atomic Design principals to help visualise how Skyscanner's products are assembled.
              </BpkParagraph>
            </BpkGridColumn>
          </BpkGridRow>
          <BpkGridRow>
            <BpkGridColumn width={12}>
              <Content />
            </BpkGridColumn>
          </BpkGridRow>
        </BpkGridContainer>
      </section>
    )
  }
}

HomePage.propTypes = {
  router: PropTypes.shape(RouterPropTypes.routerShape)
}

export default HomePage
