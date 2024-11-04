// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'UBC BIOMOD',
        social: {
            github: 'https://github.com/withastro/starlight',
        },
        sidebar: [
            {
                label: 'Home',
                link: '/',
                badge: 'Hidden'
            },
            {
                label: 'Lab Notebook',
                autogenerate: { directory: 'lab-notebook' },
                badge: {
                    text: 'Call to Action',
                }
            },
            {
                label: 'Ideas',
                autogenerate: { directory: 'ideas' },
            },
            {
                label: 'ELSI',
                autogenerate: { directory: 'elsi' },
            },
            {
                label: 'Sponsors',
                link: '/sponsors',
                badge: 'Hidden' 
            },
        ],
        components: {
            Header: './src/components/starlight-override/Header.astro',
        },
        customCss: [
            './src/tailwind.css',
        ]
        }), tailwind(), react()],
});