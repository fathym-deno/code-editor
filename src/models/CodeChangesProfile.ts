/**
 * Represents a profile for code changes, including details such as acceptance criteria,
 * description, and related tasks.
 */
export type CodeChangesProfile = {
  /**
   * Acceptance criteria for the code changes. This is an optional field that outlines
   * the conditions that must be met for the changes to be considered complete or acceptable.
   */
  AccesptanceCriteria?: string;

  /**
   * A boolean indicating whether the code change profile is complete. This field helps
   * track the progress of the tasks or changes. Defaults to `false`.
   */
  Complete?: boolean;

  /**
   * A detailed description of the code changes. This field provides additional context
   * or information about the changes being made.
   */
  Description: string;

  /**
   * The unique lookup that identifies these changes from all others.
   */
  Lookup: string;

  /**
   * The name of the code change profile. This is a required field and serves as a unique
   * identifier or title for the profile.
   */
  Name: string;

  /**
   * A list of related tasks or subtasks associated with this code change profile. Each task
   * is itself a `CodeChangesProfile`, allowing for nested or hierarchical task structures.
   */
  Tasks?: CodeChangesProfile[];
};
