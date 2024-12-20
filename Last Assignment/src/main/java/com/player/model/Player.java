package com.player.model;

public class Player extends AbstractPlayer {
    public Player() {
        super();
    }
    
    public Player(int id, String name, String skill, int exp, 
                 String country, double overallScore) {
        super(id, name, skill, exp, country, overallScore);
    }
    
    @Override
    public int getId() {
        return id;
    }
    
    @Override
    public void setId(int id) {
        this.id = id;
    }
    
    @Override
    public String getName() {
        return name;
    }
    
    @Override
    public void setName(String name) {
        this.name = name;
    }
    
    @Override
    public String getSkill() {
        return skill;
    }
    
    @Override
    public void setSkill(String skill) {
        this.skill = skill;
    }
    
    @Override
    public int getExp() {
        return exp;
    }
    
    @Override
    public void setExp(int exp) {
        this.exp = exp;
    }
    
    @Override
    public String getCountry() {
        return country;
    }
    
    @Override
    public void setCountry(String country) {
        this.country = country;
    }
    
    @Override
    public double getOverallScore() {
        return overallScore;
    }
    
    @Override
    public void setOverallScore(double overallScore) {
        this.overallScore = overallScore;
    }
    
    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", skill='" + skill + '\'' +
                ", exp=" + exp +
                ", country='" + country + '\'' +
                ", overallScore=" + overallScore +
                '}';
    }
}
