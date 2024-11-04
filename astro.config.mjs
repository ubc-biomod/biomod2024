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
                label: 'Ideas',
                autogenerate: { directory: 'ideas' },
            },
            {
                label: 'ELSI',
                autogenerate: { directory: 'elsi' },
            },
            {
                label: 'Lab Notebook',
                autogenerate: { directory: 'lab-notebook' },
                badge: {
                    text: 'Call to Action',
                }
            },
            {
                label: 'Sponsors',
                link: '/sponsors',
                badge: 'Hidden' 
            },
        ],
        components: {
            Header: './src/components/overrides/Header.astro',
            Sidebar: './src/components/overrides/Sidebar.astro',
            Pagination: './src/components/overrides/Pagination.astro',
        },
        customCss: [
            './src/tailwind.css',
        ]
        }), tailwind(), react()],
});