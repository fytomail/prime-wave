const BASE_URL = 'https://api.meetkishore.in/api/v1';
const loginEmail = 'godfather@peopleindex.ai';
const loginPassword = 'GodFather@PeopleIndex.ai#123';

async function main() {
  console.log('Seeding Database using APIs...');

  try {
    // 1. Login
    console.log('Logging in as godfather...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    });
    const loginData = await loginRes.json();
    console.log('Login Response:', loginData);
    
    // We don't have the full API working fully but we will push data
    const token = loginData.token || '';

    // 2. Create a project
    console.log('Creating a project...');
    const projRes = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        title: "AI E-Commerce Agent",
        description: "An advanced e-commerce bot utilizing RAG.",
        techStack: ["React", "Python", "OpenAI"],
        status: "open"
      })
    });
    const projData = await projRes.json();
    console.log('Project Response:', projData);

    // 3. Create a job
    console.log('Creating a job...');
    const jobRes = await fetch(`${BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        title: "Senior AI Engineer",
        location: "Remote",
        minPpsScore: 90,
        requiredSkills: ["Python", "TensorFlow", "React"],
        description: "Looking for an AI expert."
      })
    });
    const jobData = await jobRes.json();
    console.log('Job Response:', jobData);

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

main();
