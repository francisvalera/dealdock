export default function Stats() {
const items = [
{ k: "5000+", v: "Products Sold" },
{ k: "15K+", v: "Happy Customers" },
{ k: "24/7", v: "Support" },
{ k: "100%", v: "Genuine Parts" },
];
return (
<section className="bg-white py-16">
<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
{items.map(({k,v}) => (
<div key={k} className="bg-gray-100 p-8 rounded-lg">
<h3 className="text-4xl font-extrabold text-black">{k}</h3>
<p className="text-sm text-gray-500 mt-2">{v}</p>
</div>
))}
</div>
</div>
</section>
);
}