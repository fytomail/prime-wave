import fs from 'fs';

const API_BASE = 'https://api.meetkishore.in/api/v1';

async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    if (res.status === 429) {
      console.log(`Rate limited (429). Waiting 5 seconds before retry...`);
      await new Promise(r => setTimeout(r, 5000));
      continue;
    }
    return res;
  }
  return fetch(url, options);
}

async function seedData() {
  console.log('Seeding data for godfather@peopleindex.ai...');
  
  // 1. Login
  const loginRes = await fetchWithRetry(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'godfather@peopleindex.ai',
      password: 'GodFather@PeopleIndex.ai#123'
    })
  });
  
  if (!loginRes.ok) {
    const errorText = await loginRes.text();
    console.error('Login failed:', loginRes.status, errorText);
    return;
  }
  
  const loginData = await loginRes.json();
  const token = loginData.data?.tokens?.accessToken;
  const user = loginData.data?.user;
  
  if (!token) {
    console.error('Failed to get token from login response', loginData);
    return;
  }

  console.log(`Successfully logged in as ${user.email} (ID: ${user._id})`);

  // Headers for subsequent authenticated requests
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Try creating student profile
  console.log('Creating student profile...');
  const createRes = await fetchWithRetry(`${API_BASE}/students`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: user.name || 'GodFather',
      email: user.email,
      university: 'Prime Wave Academy',
      degree: 'B.Tech in Computer Science',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      preferredRole: 'Full Stack Engineer',
      preferredLang: 'JavaScript'
    })
  });
  
  if (!createRes.ok) {
    console.error('Failed to create student profile. Backend returned:', createRes.status, await createRes.text());
  } else {
    console.log('Successfully created student profile!');
  }

  // Add a project
  console.log('Adding a project...');
  const projRes = await fetchWithRetry(`${API_BASE}/projects`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      studentId: user._id,
      title: 'E-commerce Platform',
      description: 'A full stack e-commerce platform built with React, Node.js, and MongoDB.',
      type: 'Full Stack',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express']
    })
  });
  if (projRes.ok) {
    console.log('Added project successfully!');
  } else {
    console.error('Failed to add project. Backend returned:', projRes.status, await projRes.text());
  }

  console.log('Seeding completed!');
}

seedData().catch(console.error);
