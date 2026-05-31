import { Image } from 'expo-image';

interface DiceBearAvatarProps {
  seed: string;
  size: number;
}

export function DiceBearAvatar({ seed, size }: DiceBearAvatarProps) {
  const uri = `https://api.dicebear.com/9.x/notionists/png?seed=${encodeURIComponent(seed)}&size=${size * 2}`;

  return (
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      contentFit="cover"
    />
  );
}
