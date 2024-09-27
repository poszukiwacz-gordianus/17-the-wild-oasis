# The Wild Oasis

Main project in Jonas Schmedtmann's <a href="https://www.udemy.com/course/the-ultimate-react-course">Ultimate React Course</a>. Bult with React Query and Supabase.

## My additions to the original project:

1. Admin-Only User Management: The user page is now restricted to admin users. Admins can manage employees, including:
<ul>
<li> Registering new users.
</li>
<li>Editing user details (e.g., resetting passwords if an employee forgets theirs).
</li>
<li>Deleting users.
</li>
</ul>

2. Registration Page: A new page where employees can:
<ul>
<li> Register guests.

</li>
<li>Create new bookings.
</li>
</ul>

3. Today’s Activity: Added a quick link to redirect users to the current booking for easy access.
4. Message (Logs) Page: A new page dedicated to displaying logs, which are generated when:
<ul>
<li> A user creates an account.

</li>
<li>A new reservation is made.
</li>
<li>A reservation is canceled.
</li>
</ul>

5. Real-Time Logs and Notifications:
<ul>
<li> Logs are updated in real time on the message page.

</li>
<li>Unread messages are tracked and displayed in the navigation bar with a count.

</li>
<li>A message notification system is in place, showing alerts when new logs are created.
</li>
</ul>

6. Settings Option: Added a feature in the settings to remove all read messages, keeping the message page organized.

## Deployement

The project is deployed on Vercel. Check out the live demo here:

<a href="https://the-wild-oasis-app-two.vercel.app/">Live Demo</a>
