const style = getComputedStyle(document.body)

export const MOOD = {
  question: 'How do you feel today?',
  options: [
    {
      id: 'red',
      label: 'bad',
      color: style.getPropertyValue('--red'),
      buttonClass: 'btn-red',
      faIcon: 'frown',
      hoverEffect: 'hvr-icon-rotate',
    },
    {
      id: 'yellow',
      label: 'normal',
      color: style.getPropertyValue('--yellow'),
      buttonClass: 'btn-yellow',
      faIcon: '',
      hoverEffect: '',
    },
    {
      id: 'green',
      label: 'great',
      color: style.getPropertyValue('--green'),
      buttonClass: 'btn-green',
      faIcon: 'smile-beam',
      hoverEffect: 'hvr-icon-spin',
    },
  ],
}

export const defaultMood = Object.assign(
  {},
  ...MOOD.options.map((o) => ({ [o.id]: 0 }))
)
