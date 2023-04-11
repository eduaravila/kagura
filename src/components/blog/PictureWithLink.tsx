interface Props {
	src: any;
	widths?: number[];
	sizes?: string;
	alt?: string;
}

export default function PictureWithLink({ src, widths, sizes, alt }: Props) {
	const widthsProp = widths ? widths : ([200, 400, 800] as number[]);
	const sizesProp = sizes ? sizes : "(max-width: 800px) 100vw, 800px";
	const altProp = alt ? alt : "Picture";

	return (
		<>
			<img src={src} alt={altProp} />
			<a href={src} className="mb-10">
				high res version
			</a>
		</>
	);
}
