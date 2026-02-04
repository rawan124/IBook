using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTos;

using Domain;
public class UpdateUserInfoDto
{
  
  public string? NewEmail { get; set; }
    public string? NewUserName { get; set; }
  public string OldPassword { get; set; }="";

  public string NewPassword { get; set; }="";
}