import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // Memanggil file src/lib/supabase.js
import { checkGASConnection, GAS_URL } from '../lib/gas';

export default function TestPage() {
    const [supabaseStatus, setSupabaseStatus] = useState<string>('⏳ Memeriksa Supabase...');
    const [gasStatus, setGasStatus] = useState<string>('⏳ Memeriksa GAS URL...');

    useEffect(() => {
        // 1. Tes Koneksi ke Database Supabase
        async function testSupabase() {
            try {
                const { data, error } = await supabase.from('users').select('*').limit(1);
                if (error) {
                    setSupabaseStatus(`⚠️ Supabase Terhubung (Tabel 'users' mungkin belum dibuat/kosong): ${error.message}`);
                } else {
                    setSupabaseStatus('✅ Terhubung ke Supabase!');
                }
            } catch (err: any) {
                setSupabaseStatus(`❌ Error Supabase: ${err.message}`);
            }
        }

        // 2. Cek Variabel URL Google Apps Script
        async function testGAS() {
            if (!GAS_URL) {
                setGasStatus('❌ VITE_GAS_WEB_APP_URL belum diisi di .env.local');
            } else {
                const gasResult = await checkGASConnection();
                if (gasResult.success) {
                    setGasStatus(`✅ ${gasResult.message}`);
                } else {
                    setGasStatus(`❌ ${gasResult.message}`);
                }
            }
        }

        testSupabase();
        testGAS();
    }, []);


    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', lineHeight: '1.8' }}>
            <h2>Status Koneksi Proyek</h2>
            <hr />
            <p><strong>Database Supabase:</strong> {supabaseStatus}</p>
            <p><strong>Google Apps Script:</strong> {gasStatus}</p>
        </div>
    );
}