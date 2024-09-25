import { IconProps } from './icon.type'

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, ...rest }) => {
  return <IconComponent {...rest} />
}
