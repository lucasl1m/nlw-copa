import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

interface Props extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      bg={type === 'SECONDARY' ? 'red.500' : "yellow.500"}
      _pressed={{
        bg: type === 'SECONDARY' ? "red.400" : "yellow.600"
      }}
      _loading={{
        _spinner: { color: "black" }
      }}
      {...rest}
    >
      <Text
        fontSize="md"
        textTransform="uppercase"
        fontFamily="heading"
        color={type === 'SECONDARY' ? 'white' : "black"}
      >
        {title}
      </Text>
    </ButtonNativeBase >
  );
}
