/** @jsx element **/

import element from 'virtual-element';
import TweeqContainer from './container';
import TweeqButton from './button';
import TweeqNumber from './number';
import TweeqToggle from './toggle';
import TweeqText from './text';

function initialState(props) {

  return { open: !!props.open };

}

function render(component, setState) {

  let { open } = component.state;
  let { container } = component.props;
  let { label, children } = container;

  function toggleOpen(event) {

    setState({ open: !open });

  }

  if (open) {

    let controls = children.map(child => {

      switch (child.type) {

        case 'container': return <TweeqContainer container={child} />;
        case 'toggle':    return <TweeqToggle control={child} />;
        case 'button':    return <TweeqButton control={child} />;
        case 'number':    return <TweeqNumber control={child} />;
        case 'text':      return <TweeqText   control={child} />;
        default:          throw new Error('unrecognized child');

      }

    });

    return <div class='tweeq-container'>
      <div class='twee-control tweeq-close' onClick={toggleOpen}>{label}</div>
      {controls}
    </div>


  } else {


    return <div class='tweeq-control tweeq-open' onClick={toggleOpen}>{label}</div>

  }
}

export default { initialState, render };
