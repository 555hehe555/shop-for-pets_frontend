import type { ProductImage } from "@/types/api";

export function mainImgResolver(
  images: ProductImage[],
): ProductImage | undefined {
  return images.filter((image) => image.is_main).at(0);
}
