import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const brands: string[] = [
  'Yamaha','Suzuki','Honda','RCB','YSS','DBS','Uma','Takasago','Suntal','Motul','Metzeler','LS2','Komine','Rizoma','AGV','GIVI'
];

type CategorySeed = { name: string; featured: boolean; subs: string[] };
const categories: CategorySeed[] = [
  { name: 'Performance Parts', featured: true, subs: ['Brake Systems','Exhaust Sytems','Engine Components','Suspensions'] },
  { name: 'Maintenance', featured: false, subs: ['Oils and Lubricants'] },
  { name: 'Tires', featured: false, subs: ['Street Tires','Mag Wheels'] },
  { name: 'Accessories', featured: false, subs: ['Fairings'] }
];

const avengers: string[] = [
  'Tony Stark','Steve Rogers','Natasha Romanoff','Bruce Banner','Thor Odinson',
  'Clint Barton','Wanda Maximoff','Vision','Peter Parker','Stephen Strange'
];

type SeedOrderItem = {
  productId: string;
  name: string;
  sku: string | null;
  size: string | null;
  qty: number;
  price: number; // number is OK for Decimal inputs
};

async function main(): Promise<void> {
  await prisma.settings.create({ data: {} }).catch(() => undefined);

  for (const name of brands) {
    await prisma.brand.upsert({ where: { name }, update: {}, create: { name } });
  }

  for (const c of categories) {
    const cat = await prisma.category.create({ data: { name: c.name, featured: c.featured } });
    for (const s of c.subs) {
      await prisma.subcategory.create({ data: { name: s, categoryId: cat.id } });
    }
  }

  const adminPass = await bcrypt.hash('Password123!', 10);
  await prisma.user.upsert({
    where: { email: 'admin@kuyakardz.com' },
    update: { role: 'ADMIN' },
    create: { email: 'admin@kuyakardz.com', name: 'Admin', role: 'ADMIN', password: adminPass }
  });

  const userPass = await bcrypt.hash('Password123!', 10);
  for (const name of avengers) {
    const email = name.toLowerCase().replace(/\s+/g, '.') + '@example.com';
    await prisma.user.upsert({ where: { email }, update: {}, create: { email, name, password: userPass } });
  }

  const anyBrand = await prisma.brand.findFirstOrThrow();
  const anySub = await prisma.subcategory.findFirstOrThrow();

  for (let i = 1; i <= 10; i++) {
    const p = await prisma.product.create({
      data: {
        name: `Sample Part ${i}`,
        description: 'High quality motorcycle part.',
        sku: `SKU-${1000 + i}`,
        brandId: anyBrand.id,
        subcategoryId: anySub.id,
        model: i % 2 ? 'Mio' : 'Raider',
        size: i % 2 ? 'M' : 'L',
        price: 1000 + 50 * i,
        stock: 20 + i,
        isFeatured: i <= 8
      }
    });
    await prisma.productImage.create({ data: { productId: p.id, url: '/kklogo.jfif', primary: true } });
  }

  for (let i = 1; i <= 5; i++) {
    await prisma.carouselItem.create({ data: { imageUrl: `https://via.placeholder.com/1920x900?text=Promo+${i}`, sort: i } });
  }

  const users = await prisma.user.findMany({ where: { role: 'USER' } });
  const products = await prisma.product.findMany({ take: 3 });

  for (let i = 0; i < 10; i++) {
    const user = users[i % users.length]!;

    const items: SeedOrderItem[] = products.map((pr, idx) => ({
      productId: pr.id,
      name: pr.name,
      sku: pr.sku ?? null,
      size: idx % 2 ? 'M' : null,
      qty: 1 + (idx % 2),
      price: Number(pr.price)
    }));

    const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

    const order = await prisma.order.create({ data: { userId: user.id, total } });

    for (const it of items) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: it.productId,
          name: it.name,
          sku: it.sku,
          size: it.size,
          price: it.price,
          qty: it.qty
        }
      });
    }

    await prisma.shippingInfo.create({
      data: {
        orderId: order.id,
        fullName: user.name ?? 'Customer',
        phone: '09171234567',
        email: user.email ?? null,
        province: 'Metro Manila',
        city: 'Valenzuela',
        barangay: 'Canumay East',
        street: '20 G. Molina St.'
      }
    });
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
