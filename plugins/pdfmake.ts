import { defineNuxtPlugin } from 'nuxt3';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import { TCreatedPdf } from 'pdfmake/interfaces';

const { vfs } = vfsFonts;
pdfMake.vfs = vfs;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide<TCreatedPdf>('pdfMake', pdfMake);
});