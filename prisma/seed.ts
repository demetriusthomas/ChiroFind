import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Create specialties
  const specialties = await Promise.all([
    prisma.specialty.upsert({
      where: { slug: 'back-pain' },
      update: {},
      create: {
        name: 'Back Pain',
        slug: 'back-pain',
        description: 'Treatment for lower back, mid-back, and upper back pain conditions.',
        icon: 'spine',
      },
    }),
    prisma.specialty.upsert({
      where: { slug: 'neck-pain' },
      update: {},
      create: {
        name: 'Neck Pain',
        slug: 'neck-pain',
        description: 'Relief from neck stiffness, cervical issues, and related headaches.',
        icon: 'neck',
      },
    }),
    prisma.specialty.upsert({
      where: { slug: 'sports-injuries' },
      update: {},
      create: {
        name: 'Sports Injuries',
        slug: 'sports-injuries',
        description: 'Treatment and rehabilitation for athletic injuries.',
        icon: 'activity',
      },
    }),
    prisma.specialty.upsert({
      where: { slug: 'sciatica' },
      update: {},
      create: {
        name: 'Sciatica',
        slug: 'sciatica',
        description: 'Treatment for sciatic nerve pain radiating down the leg.',
        icon: 'zap',
      },
    }),
    prisma.specialty.upsert({
      where: { slug: 'headaches-migraines' },
      update: {},
      create: {
        name: 'Headaches & Migraines',
        slug: 'headaches-migraines',
        description: 'Natural relief for chronic headaches and migraines.',
        icon: 'brain',
      },
    }),
    prisma.specialty.upsert({
      where: { slug: 'prenatal-care' },
      update: {},
      create: {
        name: 'Prenatal Care',
        slug: 'prenatal-care',
        description: 'Safe chiropractic care during pregnancy.',
        icon: 'heart',
      },
    }),
    prisma.specialty.upsert({
      where: { slug: 'pediatric' },
      update: {},
      create: {
        name: 'Pediatric',
        slug: 'pediatric',
        description: 'Gentle chiropractic care for children and infants.',
        icon: 'baby',
      },
    }),
    prisma.specialty.upsert({
      where: { slug: 'auto-accident' },
      update: {},
      create: {
        name: 'Auto Accident Injuries',
        slug: 'auto-accident',
        description: 'Whiplash and injury treatment from car accidents.',
        icon: 'car',
      },
    }),
  ]);

  console.log(`✅ Created ${specialties.length} specialties`);

  // Create insurance providers
  const insurances = await Promise.all([
    prisma.insurance.upsert({
      where: { slug: 'blue-cross' },
      update: {},
      create: { name: 'Blue Cross Blue Shield', slug: 'blue-cross' },
    }),
    prisma.insurance.upsert({
      where: { slug: 'aetna' },
      update: {},
      create: { name: 'Aetna', slug: 'aetna' },
    }),
    prisma.insurance.upsert({
      where: { slug: 'united-healthcare' },
      update: {},
      create: { name: 'United Healthcare', slug: 'united-healthcare' },
    }),
    prisma.insurance.upsert({
      where: { slug: 'cigna' },
      update: {},
      create: { name: 'Cigna', slug: 'cigna' },
    }),
    prisma.insurance.upsert({
      where: { slug: 'medicare' },
      update: {},
      create: { name: 'Medicare', slug: 'medicare' },
    }),
    prisma.insurance.upsert({
      where: { slug: 'humana' },
      update: {},
      create: { name: 'Humana', slug: 'humana' },
    }),
  ]);

  console.log(`✅ Created ${insurances.length} insurance providers`);

  // Create sample chiropractors
  const providers = [
    {
      email: 'dr.smith@example.com',
      firstName: 'Sarah',
      lastName: 'Smith',
      title: 'DC, CCSP',
      bio: 'Dr. Sarah Smith has over 15 years of experience helping patients achieve optimal spinal health. She specializes in sports injuries and uses a combination of manual adjustments and modern techniques.',
      yearsExperience: 15,
      licenseState: 'CA',
      practice: {
        name: 'Bay Area Spine & Wellness',
        addressStreet: '123 Market Street',
        addressCity: 'San Francisco',
        addressState: 'California',
        addressZip: '94102',
        slug: 'bay-area-spine-wellness',
        latitude: 37.7749,
        longitude: -122.4194,
      },
      specialties: ['back-pain', 'sports-injuries', 'neck-pain'],
    },
    {
      email: 'dr.johnson@example.com',
      firstName: 'Michael',
      lastName: 'Johnson',
      title: 'DC',
      bio: 'Dr. Michael Johnson focuses on holistic wellness and family chiropractic care. He believes in treating the whole person, not just the symptoms.',
      yearsExperience: 10,
      licenseState: 'CA',
      practice: {
        name: 'Family Chiropractic Center',
        addressStreet: '456 Oak Avenue',
        addressCity: 'Los Angeles',
        addressState: 'California',
        addressZip: '90001',
        slug: 'family-chiropractic-center-la',
        latitude: 34.0522,
        longitude: -118.2437,
      },
      specialties: ['back-pain', 'pediatric', 'prenatal-care'],
    },
    {
      email: 'dr.chen@example.com',
      firstName: 'Lisa',
      lastName: 'Chen',
      title: 'DC, DACBSP',
      bio: 'Dr. Lisa Chen is a board-certified sports chiropractor who has worked with professional athletes. She combines traditional chiropractic with cutting-edge rehabilitation techniques.',
      yearsExperience: 12,
      licenseState: 'NY',
      practice: {
        name: 'Manhattan Sports Chiropractic',
        addressStreet: '789 5th Avenue',
        addressCity: 'New York',
        addressState: 'New York',
        addressZip: '10022',
        slug: 'manhattan-sports-chiro',
        latitude: 40.7128,
        longitude: -74.0060,
      },
      specialties: ['sports-injuries', 'back-pain', 'auto-accident'],
    },
    {
      email: 'dr.williams@example.com',
      firstName: 'James',
      lastName: 'Williams',
      title: 'DC',
      bio: 'Dr. James Williams specializes in treating chronic pain and headaches using gentle, effective techniques. He has helped thousands of patients find relief.',
      yearsExperience: 20,
      licenseState: 'TX',
      practice: {
        name: 'Austin Wellness Chiropractic',
        addressStreet: '321 Congress Ave',
        addressCity: 'Austin',
        addressState: 'Texas',
        addressZip: '78701',
        slug: 'austin-wellness-chiro',
        latitude: 30.2672,
        longitude: -97.7431,
      },
      specialties: ['headaches-migraines', 'neck-pain', 'sciatica'],
    },
    {
      email: 'dr.garcia@example.com',
      firstName: 'Maria',
      lastName: 'Garcia',
      title: 'DC, CACCP',
      bio: 'Dr. Maria Garcia is certified in prenatal and pediatric chiropractic care. She creates a warm, welcoming environment for families seeking natural healthcare.',
      yearsExperience: 8,
      licenseState: 'FL',
      practice: {
        name: 'Miami Family Chiropractic',
        addressStreet: '555 Brickell Ave',
        addressCity: 'Miami',
        addressState: 'Florida',
        addressZip: '33131',
        slug: 'miami-family-chiro',
        latitude: 25.7617,
        longitude: -80.1918,
      },
      specialties: ['prenatal-care', 'pediatric', 'back-pain'],
    },
    {
      email: 'dr.taylor@example.com',
      firstName: 'Robert',
      lastName: 'Taylor',
      title: 'DC, FICC',
      bio: 'Dr. Robert Taylor brings 25 years of experience in treating complex spinal conditions. He is a fellow of the International Chiropractic Council.',
      yearsExperience: 25,
      licenseState: 'NV',
      practice: {
        name: 'Las Vegas Spine Institute',
        addressStreet: '888 Las Vegas Blvd',
        addressCity: 'Las Vegas',
        addressState: 'Nevada',
        addressZip: '89101',
        slug: 'las-vegas-spine-institute',
        latitude: 36.1699,
        longitude: -115.1398,
      },
      specialties: ['back-pain', 'sciatica', 'auto-accident'],
    },
  ];

  for (const providerData of providers) {
    // Create user
    const user = await prisma.user.upsert({
      where: { email: providerData.email },
      update: {},
      create: {
        email: providerData.email,
        firstName: providerData.firstName,
        lastName: providerData.lastName,
        role: 'PROVIDER',
        emailVerified: true,
      },
    });

    // Create provider
    const provider = await prisma.provider.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        title: providerData.title,
        bio: providerData.bio,
        yearsExperience: providerData.yearsExperience,
        licenseState: providerData.licenseState,
        isActive: true,
        acceptingPatients: true,
        subscriptionTier: 'PREMIUM',
      },
    });

    // Create practice
    await prisma.practice.upsert({
      where: { slug: providerData.practice.slug },
      update: {},
      create: {
        providerId: provider.id,
        name: providerData.practice.name,
        addressStreet: providerData.practice.addressStreet,
        addressCity: providerData.practice.addressCity,
        addressState: providerData.practice.addressState,
        addressZip: providerData.practice.addressZip,
        slug: providerData.practice.slug,
        latitude: providerData.practice.latitude,
        longitude: providerData.practice.longitude,
      },
    });

    // Link specialties
    for (const specialtySlug of providerData.specialties) {
      const specialty = specialties.find(s => s.slug === specialtySlug);
      if (specialty) {
        await prisma.providerSpecialty.upsert({
          where: {
            providerId_specialtyId: {
              providerId: provider.id,
              specialtyId: specialty.id,
            },
          },
          update: {},
          create: {
            providerId: provider.id,
            specialtyId: specialty.id,
            isPrimary: providerData.specialties.indexOf(specialtySlug) === 0,
          },
        });
      }
    }

    // Link insurances (random selection)
    const providerInsurances = insurances.slice(0, Math.floor(Math.random() * 4) + 2);
    for (const insurance of providerInsurances) {
      await prisma.providerInsurance.upsert({
        where: {
          providerId_insuranceId: {
            providerId: provider.id,
            insuranceId: insurance.id,
          },
        },
        update: {},
        create: {
          providerId: provider.id,
          insuranceId: insurance.id,
        },
      });
    }

    // Create services
    await prisma.service.createMany({
      skipDuplicates: true,
      data: [
        {
          providerId: provider.id,
          name: 'Initial Consultation',
          description: 'Comprehensive evaluation including health history, examination, and treatment plan.',
          duration: 60,
          price: 150,
        },
        {
          providerId: provider.id,
          name: 'Chiropractic Adjustment',
          description: 'Manual spinal adjustment to restore proper alignment and function.',
          duration: 30,
          price: 75,
        },
        {
          providerId: provider.id,
          name: 'Follow-up Visit',
          description: 'Continued care and adjustment based on treatment plan.',
          duration: 20,
          price: 50,
        },
      ],
    });

    console.log(`✅ Created provider: Dr. ${providerData.firstName} ${providerData.lastName}`);
  }

  // Create location entries for SEO
  const locations = [
    { city: 'San Francisco', state: 'California', stateCode: 'CA' },
    { city: 'Los Angeles', state: 'California', stateCode: 'CA' },
    { city: 'New York', state: 'New York', stateCode: 'NY' },
    { city: 'Austin', state: 'Texas', stateCode: 'TX' },
    { city: 'Miami', state: 'Florida', stateCode: 'FL' },
    { city: 'Las Vegas', state: 'Nevada', stateCode: 'NV' },
  ];

  for (const loc of locations) {
    await prisma.location.upsert({
      where: { slug: `${loc.city.toLowerCase().replace(/\s+/g, '-')}-${loc.stateCode.toLowerCase()}` },
      update: { providerCount: 1 },
      create: {
        city: loc.city,
        state: loc.state,
        stateCode: loc.stateCode,
        slug: `${loc.city.toLowerCase().replace(/\s+/g, '-')}-${loc.stateCode.toLowerCase()}`,
        providerCount: 1,
      },
    });
  }

  console.log(`✅ Created ${locations.length} location entries`);

  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
