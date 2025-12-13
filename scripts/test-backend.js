import { auth, db } from '../src/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

async function testBackendConnections() {
    console.log('Testing backend connections...\n');

    // Test Firebase Authentication
    console.log('1. Testing Firebase Authentication:');
    try {
        await auth.authStateReady();
        console.log('✓ Firebase Auth is initialized and ready');
        const currentUser = auth.currentUser;
        console.log(`  Current user: ${currentUser ? currentUser.email : 'No user signed in'}`);
    } catch (error) {
        console.error('✗ Firebase Auth error:', error.message);
    }

    // Test Firestore
    console.log('\n2. Testing Firestore Connection:');
    try {
        const testQuery = await getDocs(collection(db, 'projects'));
        console.log('✓ Firestore connection successful');
        console.log(`  Found ${testQuery.size} projects in database`);
    } catch (error) {
        console.error('✗ Firestore error:', error.message);
    }

    console.log('\nBackend connection tests completed.');
}

testBackendConnections().catch(console.error);