'use server'

import { Board } from "@/interface/Board";
import { Task } from "@/interface/Task";
import { supabase } from "./supabase";
import { initialBoardsSeed } from "./seedData";
import { randomUUID } from "crypto";

export const getAllBoards = async (): Promise<Board[]> => {
  try {
    const { data, error } = await supabase
      .from('boards')
      .select('*');

    if (error) {
      console.error('Error fetching boards from Supabase:', error);
      throw error;
    }

    // Seed initial boards if database is empty
    if (!data || data.length === 0) {
      console.log('No boards found in Supabase, seeding initial boards...');
      const { error: seedError } = await supabase
        .from('boards')
        .insert(initialBoardsSeed);

      if (seedError) {
        console.error('Error seeding initial boards:', seedError);
      } else {
        return initialBoardsSeed;
      }
    }

    return data || [];
  } catch (error) {
    console.error('getAllBoards failed:', error);
    return [];
  }
};

export const getBoardByTitle = async (title: string): Promise<Board[]> => {
  try {
    const decodedTitle = decodeURIComponent(title);
    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .eq('title', decodedTitle);

    if (error) {
      console.error('Error fetching board by title from Supabase:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('getBoardByTitle failed:', error);
    return [];
  }
};

export const createBoard = async (data: { title: string }) => {
  try {
    const newBoard = {
      id: randomUUID(),
      title: data.title,
      columns: [
        {
          id: randomUUID(),
          title: "TO DO",
          color: "#89CFF0",
          order: 1
        }
      ],
      tasks: []
    };


    const { data: insertedData, error } = await supabase
      .from('boards')
      .insert(newBoard)
      .select();

    if (error) {
      console.error('Error creating board in Supabase:', error);
      throw error;
    }

    return insertedData?.[0] || newBoard;
  } catch (error) {
    console.error('createBoard failed:', error);
    throw error;
  }
};

export const saveBoard = async (data: any) => {
  try {
    const { data: updatedData, error } = await supabase
      .from('boards')
      .update({
        title: data.title,
        columns: data.columns || [],
        tasks: data.tasks || []
      })
      .eq('id', data.id)
      .select();

    if (error) {
      console.error('Error saving board in Supabase:', error);
      throw error;
    }

    return updatedData?.[0];
  } catch (error) {
    console.error('saveBoard failed:', error);
    throw error;
  }
};

export const patchBoard = async (tasks: Task[] | undefined, id: string | undefined) => {
  if (!id) return;
  try {
    const { data: updatedData, error } = await supabase
      .from('boards')
      .update({
        tasks: tasks || []
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error patching board in Supabase:', error);
      throw error;
    }

    return updatedData?.[0];
  } catch (error) {
    console.error('patchBoard failed:', error);
    throw error;
  }
};

export const deleteData = async () => {
  return { success: true };
};