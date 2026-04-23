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

  // Create sample chiropractors - expanded for realistic demo
  const providers = [
    // San Francisco
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
      email: 'dr.wong@example.com',
      firstName: 'David',
      lastName: 'Wong',
      title: 'DC, CCEP',
      bio: 'Dr. David Wong specializes in ergonomic assessments and workplace injury prevention. He works with tech companies throughout the Bay Area to keep employees healthy.',
      yearsExperience: 11,
      licenseState: 'CA',
      practice: {
        name: 'SF Ergonomic Chiropractic',
        addressStreet: '580 California Street',
        addressCity: 'San Francisco',
        addressState: 'California',
        addressZip: '94104',
        slug: 'sf-ergonomic-chiropractic',
        latitude: 37.7929,
        longitude: -122.4034,
      },
      specialties: ['neck-pain', 'back-pain', 'headaches-migraines'],
    },
    // Los Angeles
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
      email: 'dr.patel@example.com',
      firstName: 'Priya',
      lastName: 'Patel',
      title: 'DC, DABCI',
      bio: 'Dr. Priya Patel integrates chiropractic care with functional medicine. She takes a whole-body approach to help patients achieve lasting wellness.',
      yearsExperience: 9,
      licenseState: 'CA',
      practice: {
        name: 'Integrative Spine & Wellness',
        addressStreet: '9250 Wilshire Blvd',
        addressCity: 'Beverly Hills',
        addressState: 'California',
        addressZip: '90212',
        slug: 'integrative-spine-wellness-bh',
        latitude: 34.0674,
        longitude: -118.3996,
      },
      specialties: ['back-pain', 'headaches-migraines', 'sciatica'],
    },
    // New York
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
      email: 'dr.rosenberg@example.com',
      firstName: 'Daniel',
      lastName: 'Rosenberg',
      title: 'DC',
      bio: 'Dr. Daniel Rosenberg has been serving the Brooklyn community for over 18 years. He specializes in treating chronic pain conditions with a gentle, patient-centered approach.',
      yearsExperience: 18,
      licenseState: 'NY',
      practice: {
        name: 'Brooklyn Heights Chiropractic',
        addressStreet: '142 Montague Street',
        addressCity: 'Brooklyn',
        addressState: 'New York',
        addressZip: '11201',
        slug: 'brooklyn-heights-chiro',
        latitude: 40.6943,
        longitude: -73.9930,
      },
      specialties: ['back-pain', 'neck-pain', 'sciatica'],
    },
    // Austin
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
    // Miami
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
      email: 'dr.martinez@example.com',
      firstName: 'Carlos',
      lastName: 'Martinez',
      title: 'DC, CCSP',
      bio: 'Dr. Carlos Martinez works with athletes of all levels, from weekend warriors to professional sports teams. He specializes in sports performance and injury recovery.',
      yearsExperience: 14,
      licenseState: 'FL',
      practice: {
        name: 'Miami Sports & Spine',
        addressStreet: '1200 Biscayne Blvd',
        addressCity: 'Miami',
        addressState: 'Florida',
        addressZip: '33132',
        slug: 'miami-sports-spine',
        latitude: 25.7875,
        longitude: -80.1864,
      },
      specialties: ['sports-injuries', 'back-pain', 'auto-accident'],
    },
    // Las Vegas
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
    {
      email: 'dr.anderson@example.com',
      firstName: 'Jennifer',
      lastName: 'Anderson',
      title: 'DC',
      bio: 'Dr. Jennifer Anderson specializes in helping patients recover from auto accidents. She works closely with attorneys and insurance companies to ensure comprehensive care.',
      yearsExperience: 7,
      licenseState: 'NV',
      practice: {
        name: 'Henderson Auto Injury Clinic',
        addressStreet: '2450 W Horizon Ridge Pkwy',
        addressCity: 'Henderson',
        addressState: 'Nevada',
        addressZip: '89052',
        slug: 'henderson-auto-injury-clinic',
        latitude: 36.0135,
        longitude: -115.0824,
      },
      specialties: ['auto-accident', 'neck-pain', 'back-pain'],
    },
    // Chicago
    {
      email: 'dr.oconnor@example.com',
      firstName: 'Patrick',
      lastName: "O'Connor",
      title: 'DC, CCSP',
      bio: "Dr. Patrick O'Connor has been Chicago's trusted sports chiropractor for over 16 years. He has worked with the Cubs, Bears, and numerous college athletes.",
      yearsExperience: 16,
      licenseState: 'IL',
      practice: {
        name: 'Chicago Sports Chiropractic',
        addressStreet: '333 N Michigan Ave',
        addressCity: 'Chicago',
        addressState: 'Illinois',
        addressZip: '60601',
        slug: 'chicago-sports-chiropractic',
        latitude: 41.8873,
        longitude: -87.6246,
      },
      specialties: ['sports-injuries', 'back-pain', 'neck-pain'],
    },
    {
      email: 'dr.kim@example.com',
      firstName: 'Grace',
      lastName: 'Kim',
      title: 'DC, CACCP',
      bio: 'Dr. Grace Kim provides gentle, family-focused chiropractic care. She is certified in pediatric and prenatal techniques and loves working with families.',
      yearsExperience: 6,
      licenseState: 'IL',
      practice: {
        name: 'Lincoln Park Family Chiropractic',
        addressStreet: '2650 N Clark Street',
        addressCity: 'Chicago',
        addressState: 'Illinois',
        addressZip: '60614',
        slug: 'lincoln-park-family-chiro',
        latitude: 41.9295,
        longitude: -87.6443,
      },
      specialties: ['pediatric', 'prenatal-care', 'back-pain'],
    },
    // Seattle
    {
      email: 'dr.nguyen@example.com',
      firstName: 'Kevin',
      lastName: 'Nguyen',
      title: 'DC, DABCO',
      bio: 'Dr. Kevin Nguyen is board certified in chiropractic orthopedics. He takes a conservative, evidence-based approach to treating musculoskeletal conditions.',
      yearsExperience: 13,
      licenseState: 'WA',
      practice: {
        name: 'Seattle Spine & Orthopedics',
        addressStreet: '1001 4th Ave',
        addressCity: 'Seattle',
        addressState: 'Washington',
        addressZip: '98154',
        slug: 'seattle-spine-orthopedics',
        latitude: 47.6062,
        longitude: -122.3321,
      },
      specialties: ['back-pain', 'sciatica', 'sports-injuries'],
    },
    {
      email: 'dr.campbell@example.com',
      firstName: 'Emily',
      lastName: 'Campbell',
      title: 'DC',
      bio: 'Dr. Emily Campbell focuses on wellness care and preventive health. She helps patients maintain optimal spinal health through regular adjustments and lifestyle coaching.',
      yearsExperience: 5,
      licenseState: 'WA',
      practice: {
        name: 'Ballard Wellness Chiropractic',
        addressStreet: '5425 Ballard Ave NW',
        addressCity: 'Seattle',
        addressState: 'Washington',
        addressZip: '98107',
        slug: 'ballard-wellness-chiro',
        latitude: 47.6677,
        longitude: -122.3839,
      },
      specialties: ['neck-pain', 'headaches-migraines', 'back-pain'],
    },
    // Denver
    {
      email: 'dr.thompson@example.com',
      firstName: 'Mark',
      lastName: 'Thompson',
      title: 'DC, CCSP',
      bio: 'Dr. Mark Thompson is an avid outdoorsman who understands the demands of an active Colorado lifestyle. He helps skiers, hikers, and athletes stay in peak condition.',
      yearsExperience: 11,
      licenseState: 'CO',
      practice: {
        name: 'Denver Active Life Chiropractic',
        addressStreet: '1660 Lincoln Street',
        addressCity: 'Denver',
        addressState: 'Colorado',
        addressZip: '80264',
        slug: 'denver-active-life-chiro',
        latitude: 39.7392,
        longitude: -104.9903,
      },
      specialties: ['sports-injuries', 'back-pain', 'neck-pain'],
    },
    {
      email: 'dr.rivera@example.com',
      firstName: 'Sofia',
      lastName: 'Rivera',
      title: 'DC',
      bio: 'Dr. Sofia Rivera specializes in treating chronic headaches and migraines without medication. She uses targeted adjustments and lifestyle modifications to provide lasting relief.',
      yearsExperience: 9,
      licenseState: 'CO',
      practice: {
        name: 'Mile High Headache Relief',
        addressStreet: '3300 E 1st Ave',
        addressCity: 'Denver',
        addressState: 'Colorado',
        addressZip: '80206',
        slug: 'mile-high-headache-relief',
        latitude: 39.7186,
        longitude: -104.9529,
      },
      specialties: ['headaches-migraines', 'neck-pain', 'back-pain'],
    },
    // Phoenix
    {
      email: 'dr.cooper@example.com',
      firstName: 'Ryan',
      lastName: 'Cooper',
      title: 'DC, DACNB',
      bio: 'Dr. Ryan Cooper is board certified in chiropractic neurology. He treats complex cases involving vertigo, balance disorders, and post-concussion syndrome.',
      yearsExperience: 15,
      licenseState: 'AZ',
      practice: {
        name: 'Phoenix Neurological Chiropractic',
        addressStreet: '2525 E Camelback Rd',
        addressCity: 'Phoenix',
        addressState: 'Arizona',
        addressZip: '85016',
        slug: 'phoenix-neurological-chiro',
        latitude: 33.5094,
        longitude: -112.0197,
      },
      specialties: ['headaches-migraines', 'neck-pain', 'back-pain'],
    },
    {
      email: 'dr.shaw@example.com',
      firstName: 'Amanda',
      lastName: 'Shaw',
      title: 'DC',
      bio: 'Dr. Amanda Shaw provides compassionate care for seniors dealing with arthritis, degenerative conditions, and mobility issues. She uses gentle techniques appropriate for all ages.',
      yearsExperience: 12,
      licenseState: 'AZ',
      practice: {
        name: 'Scottsdale Senior Spine Care',
        addressStreet: '7150 E Camelback Rd',
        addressCity: 'Scottsdale',
        addressState: 'Arizona',
        addressZip: '85251',
        slug: 'scottsdale-senior-spine',
        latitude: 33.5021,
        longitude: -111.9268,
      },
      specialties: ['back-pain', 'sciatica', 'neck-pain'],
    },
    // Boston
    {
      email: 'dr.murphy@example.com',
      firstName: 'Sean',
      lastName: 'Murphy',
      title: 'DC, CCSP',
      bio: 'Dr. Sean Murphy has worked with Boston-area collegiate and professional athletes for over 20 years. He specializes in sports performance and injury prevention.',
      yearsExperience: 22,
      licenseState: 'MA',
      practice: {
        name: 'Boston Athletic Chiropractic',
        addressStreet: '100 Cambridge Street',
        addressCity: 'Boston',
        addressState: 'Massachusetts',
        addressZip: '02114',
        slug: 'boston-athletic-chiropractic',
        latitude: 42.3601,
        longitude: -71.0589,
      },
      specialties: ['sports-injuries', 'back-pain', 'neck-pain'],
    },
    {
      email: 'dr.walsh@example.com',
      firstName: 'Megan',
      lastName: 'Walsh',
      title: 'DC, CACCP',
      bio: 'Dr. Megan Walsh is passionate about prenatal and pediatric chiropractic care. She helps expecting mothers and children thrive naturally.',
      yearsExperience: 8,
      licenseState: 'MA',
      practice: {
        name: 'Cambridge Family Wellness',
        addressStreet: '1033 Massachusetts Ave',
        addressCity: 'Cambridge',
        addressState: 'Massachusetts',
        addressZip: '02138',
        slug: 'cambridge-family-wellness',
        latitude: 42.3736,
        longitude: -71.1097,
      },
      specialties: ['prenatal-care', 'pediatric', 'back-pain'],
    },
    // Atlanta
    {
      email: 'dr.jackson@example.com',
      firstName: 'Marcus',
      lastName: 'Jackson',
      title: 'DC',
      bio: 'Dr. Marcus Jackson brings a holistic approach to chiropractic care, combining adjustments with nutrition counseling and exercise rehabilitation.',
      yearsExperience: 10,
      licenseState: 'GA',
      practice: {
        name: 'Atlanta Holistic Spine Center',
        addressStreet: '3393 Peachtree Rd NE',
        addressCity: 'Atlanta',
        addressState: 'Georgia',
        addressZip: '30326',
        slug: 'atlanta-holistic-spine',
        latitude: 33.8463,
        longitude: -84.3621,
      },
      specialties: ['back-pain', 'neck-pain', 'headaches-migraines'],
    },
    {
      email: 'dr.brooks@example.com',
      firstName: 'Ashley',
      lastName: 'Brooks',
      title: 'DC, CCEP',
      bio: 'Dr. Ashley Brooks focuses on workplace ergonomics and repetitive strain injuries. She partners with major Atlanta corporations to keep employees healthy and productive.',
      yearsExperience: 7,
      licenseState: 'GA',
      practice: {
        name: 'Midtown Ergonomic Health',
        addressStreet: '999 Peachtree St NE',
        addressCity: 'Atlanta',
        addressState: 'Georgia',
        addressZip: '30309',
        slug: 'midtown-ergonomic-health',
        latitude: 33.7817,
        longitude: -84.3833,
      },
      specialties: ['neck-pain', 'back-pain', 'headaches-migraines'],
    },
    // Dallas
    {
      email: 'dr.harris@example.com',
      firstName: 'Brandon',
      lastName: 'Harris',
      title: 'DC, CCSP',
      bio: 'Dr. Brandon Harris is a former college football player who now helps athletes recover from injuries and perform at their best.',
      yearsExperience: 9,
      licenseState: 'TX',
      practice: {
        name: 'Dallas Sports Medicine Chiropractic',
        addressStreet: '2001 Ross Ave',
        addressCity: 'Dallas',
        addressState: 'Texas',
        addressZip: '75201',
        slug: 'dallas-sports-medicine-chiro',
        latitude: 32.7876,
        longitude: -96.7969,
      },
      specialties: ['sports-injuries', 'back-pain', 'auto-accident'],
    },
    {
      email: 'dr.edwards@example.com',
      firstName: 'Stephanie',
      lastName: 'Edwards',
      title: 'DC',
      bio: 'Dr. Stephanie Edwards provides gentle chiropractic care for the whole family. She specializes in treating children with colic, ear infections, and developmental issues.',
      yearsExperience: 11,
      licenseState: 'TX',
      practice: {
        name: 'Plano Family Chiropractic',
        addressStreet: '5800 Legacy Dr',
        addressCity: 'Plano',
        addressState: 'Texas',
        addressZip: '75024',
        slug: 'plano-family-chiropractic',
        latitude: 33.0754,
        longitude: -96.8289,
      },
      specialties: ['pediatric', 'prenatal-care', 'back-pain'],
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
    { city: 'San Francisco', state: 'California', stateCode: 'CA', count: 2 },
    { city: 'Los Angeles', state: 'California', stateCode: 'CA', count: 1 },
    { city: 'Beverly Hills', state: 'California', stateCode: 'CA', count: 1 },
    { city: 'New York', state: 'New York', stateCode: 'NY', count: 1 },
    { city: 'Brooklyn', state: 'New York', stateCode: 'NY', count: 1 },
    { city: 'Austin', state: 'Texas', stateCode: 'TX', count: 1 },
    { city: 'Dallas', state: 'Texas', stateCode: 'TX', count: 1 },
    { city: 'Plano', state: 'Texas', stateCode: 'TX', count: 1 },
    { city: 'Miami', state: 'Florida', stateCode: 'FL', count: 2 },
    { city: 'Las Vegas', state: 'Nevada', stateCode: 'NV', count: 1 },
    { city: 'Henderson', state: 'Nevada', stateCode: 'NV', count: 1 },
    { city: 'Chicago', state: 'Illinois', stateCode: 'IL', count: 2 },
    { city: 'Seattle', state: 'Washington', stateCode: 'WA', count: 2 },
    { city: 'Denver', state: 'Colorado', stateCode: 'CO', count: 2 },
    { city: 'Phoenix', state: 'Arizona', stateCode: 'AZ', count: 1 },
    { city: 'Scottsdale', state: 'Arizona', stateCode: 'AZ', count: 1 },
    { city: 'Boston', state: 'Massachusetts', stateCode: 'MA', count: 1 },
    { city: 'Cambridge', state: 'Massachusetts', stateCode: 'MA', count: 1 },
    { city: 'Atlanta', state: 'Georgia', stateCode: 'GA', count: 2 },
  ];

  for (const loc of locations) {
    await prisma.location.upsert({
      where: { slug: `${loc.city.toLowerCase().replace(/\s+/g, '-')}-${loc.stateCode.toLowerCase()}` },
      update: { providerCount: loc.count },
      create: {
        city: loc.city,
        state: loc.state,
        stateCode: loc.stateCode,
        slug: `${loc.city.toLowerCase().replace(/\s+/g, '-')}-${loc.stateCode.toLowerCase()}`,
        providerCount: loc.count,
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
