import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminStats } from 'src/app/model/admin-stats.model';
import { Store } from 'src/app/model/store';
import { StoreOrderStats } from 'src/app/model/StoreOrderStats';
import { DataState } from 'src/app/model/utils/data-state';
import { AdminService } from 'src/app/service/admin.service';
import { NotificationService } from 'src/app/service/notification.service';
import { StoreService } from 'src/app/service/storeService.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit,AfterViewInit{
  stats!: AdminStats;
  statsALL: StoreOrderStats[] = [];
  pagedStats = new MatTableDataSource<StoreOrderStats>();
  selectedDate: Date = new Date();
  displayedColumns = ['store', 'pending', 'approved', 'paid', 'delivery'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  myStoreList:Store[]=[];
    appState: DataState = DataState.LOADING_STATE;
    readonly DataState = DataState;


  constructor(private location: Location,private storeService:StoreService,
    private notifier: NotificationService,private adminService: AdminService
   ) { 

   }



   totalLivreurs = 0;
   totalBoutiques = 0;
   commandes = {
     enAttente: 0,
     enCours: 0,
     livrees: 0
   };
 
 
 
   ngOnInit(): void {
    this.adminService.getStats().subscribe({
      next: (data) => this.stats = data,
      error: (err) => console.error(err)
    });
    this.loadStats();

  }
  ngAfterViewInit(): void {
    this.pagedStats.paginator = this.paginator;
  }
  loadStats() {
    const formattedDate = this.selectedDate.toISOString().split('T')[0];
    this.adminService.getStatsAll(formattedDate).subscribe(data => {
      this.statsALL = data;
      this.pagedStats.data = data;
    });
  }
}
