-- Seed data migration: inserts sample students, subjects, and enrollments
-- This will be tracked by the migration system and should run once.

SET client_encoding = 'UTF8';

-- Clean up existing data to avoid conflicts
DELETE FROM tutors;
DELETE FROM childs;
DELETE FROM courses;
DELETE FROM childs_enrollments;