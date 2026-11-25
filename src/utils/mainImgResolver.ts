import type { ProductImage } from "@/types/api";
import { CatPlaseholder } from "@/data/images";

export function mainImgResolver(
  images: ProductImage[],
): ProductImage | undefined {
  if (images.length == 0) {
    console.log("in if");
    const placeholderImg: ProductImage = {
      id: -1,
      image: CatPlaseholder,
      alt: "no image",
      is_main: true,
    };

    return placeholderImg;
  }

  return images.filter((image) => image.is_main).at(0);
}
