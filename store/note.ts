import { defineStore } from 'pinia'
import { Note } from '~/server/typeorm/entity/Note';

interface NoteState {
  currentNote: Note;
}

export const noteStore = defineStore('note', {
  state: () => ({
    currentNote: {} as Note,
  }),

  getters: {
    // getCurrentPatient: (state) => state.currentPatient,
    getCurrentNote: (state: NoteState): Note | null =>
      Object.keys(state.currentNote).length > 0 ? state.currentNote : null,
  },
  actions: {
    setCurrentNote(note: Note) {
        this.currentNote = note;
    },
  },
})