import element from 'virtual-element';

export default function(component, update) {

  const { label, children, depth = 0 } = component.props;

  // Render a padding style string based on the group depth.
  // let padding = `padding-left: ${ depth * 5 }px`;

  // Map the children to rows of elements.
  let rows = children.map(child => {

    return child;

  });

  return <div class='tweeq-group'>{ rows }</div>

}
