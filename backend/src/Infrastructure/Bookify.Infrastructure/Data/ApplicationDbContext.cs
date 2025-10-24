// path: backend/src/Infrastructure/Bookify.Infrastructure/Data/ApplicationDbContext.cs

using Bookify.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bookify.Infrastructure.Data;


public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<PatientProfile> PatientProfiles { get; set; }
    public DbSet<Professional> Professionals { get; set; }

    // Sobrescribimos este método para configurar las relaciones
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuración de la relación Booking <-> User (no cambia)
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.User)
            .WithMany()
            .HasForeignKey(b => b.UserId);

        // Configuración de la relación Booking <-> Service (no cambia)
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Service)
            .WithMany()
            .HasForeignKey(b => b.ServiceId);

        // vvv ESTA ES LA CONFIGURACIÓN CORREGIDA Y EXPLÍCITA vvv
        // En lugar de la configuración anterior que empezaba desde User
        modelBuilder.Entity<PatientProfile>()
            .HasOne(p => p.User) // Un PatientProfile tiene un User
            .WithOne(u => u.PatientProfile) // Un User tiene un PatientProfile
            .HasForeignKey<PatientProfile>(p => p.UserId); // La clave foránea es UserId en la tabla PatientProfiles

        modelBuilder.Entity<Service>()
    .Property(s => s.Price)
    .HasPrecision(18, 2);


    modelBuilder.Entity<Booking>()
        .HasOne(b => b.Professional)
        .WithMany() // Un profesional puede tener muchas reservas
        .HasForeignKey(b => b.ProfessionalId);
    }
    

}